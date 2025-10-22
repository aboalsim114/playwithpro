#!/bin/bash

# ===========================================
# PlayWithPro - Production Deployment Script
# ===========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Function to check system resources
check_resources() {
    print_status "Checking system resources..."
    
    # Check available memory
    available_memory=$(free -m | awk 'NR==2{printf "%.0f", $7}')
    if [ "$available_memory" -lt 1024 ]; then
        print_warning "Available memory is less than 1GB. Production deployment might be slow."
    fi
    
    # Check available disk space
    available_disk=$(df -BG . | awk 'NR==2{print $4}' | sed 's/G//')
    if [ "$available_disk" -lt 5 ]; then
        print_warning "Available disk space is less than 5GB. Consider freeing up space."
    fi
}

# Function to create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    mkdir -p docker/nginx/ssl
    mkdir -p docker/monitoring
    mkdir -p logs
}

# Function to stop existing production containers
stop_prod() {
    print_status "Stopping existing production containers..."
    docker-compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true
}

# Function to build production images
build_prod() {
    print_status "Building production images..."
    docker-compose -f docker-compose.prod.yml build --no-cache --parallel
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose -f docker-compose.prod.yml up -d
    
    print_status "Waiting for services to start..."
    sleep 15
    
    # Check application health
    if curl -f http://localhost:8080/health > /dev/null 2>&1; then
        print_success "Application is healthy!"
    else
        print_warning "Application health check failed. Please check the logs."
    fi
    
    # Check nginx health
    if curl -f http://localhost/health > /dev/null 2>&1; then
        print_success "Nginx is healthy!"
    else
        print_warning "Nginx health check failed. Please check the logs."
    fi
}

# Function to show production status
show_status() {
    print_status "Production environment status:"
    docker-compose -f docker-compose.prod.yml ps
    
    echo ""
    print_status "Service URLs:"
    echo "  Application: http://localhost:8080"
    echo "  Nginx:       http://localhost"
    echo "  Prometheus:  http://localhost:9090"
    echo "  Grafana:     http://localhost:3001 (admin/admin123)"
}

# Function to show logs
show_logs() {
    local service="${1:-}"
    if [ -n "$service" ]; then
        print_status "Showing logs for $service..."
        docker-compose -f docker-compose.prod.yml logs -f "$service"
    else
        print_status "Showing all production logs..."
        docker-compose -f docker-compose.prod.yml logs -f
    fi
}

# Function to backup data
backup_data() {
    local backup_dir="backups/$(date +%Y%m%d_%H%M%S)"
    print_status "Creating backup in $backup_dir..."
    
    mkdir -p "$backup_dir"
    
    # Backup volumes
    docker run --rm -v playwithpro-prometheus-data:/data -v "$(pwd)/$backup_dir":/backup alpine tar czf /backup/prometheus-data.tar.gz -C /data .
    docker run --rm -v playwithpro-grafana-data:/data -v "$(pwd)/$backup_dir":/backup alpine tar czf /backup/grafana-data.tar.gz -C /data .
    
    print_success "Backup completed in $backup_dir"
}

# Function to restore data
restore_data() {
    local backup_dir="${1:-}"
    if [ -z "$backup_dir" ]; then
        print_error "Please specify backup directory"
        exit 1
    fi
    
    if [ ! -d "$backup_dir" ]; then
        print_error "Backup directory $backup_dir does not exist"
        exit 1
    fi
    
    print_status "Restoring data from $backup_dir..."
    
    # Restore volumes
    if [ -f "$backup_dir/prometheus-data.tar.gz" ]; then
        docker run --rm -v playwithpro-prometheus-data:/data -v "$(pwd)/$backup_dir":/backup alpine tar xzf /backup/prometheus-data.tar.gz -C /data
    fi
    
    if [ -f "$backup_dir/grafana-data.tar.gz" ]; then
        docker run --rm -v playwithpro-grafana-data:/data -v "$(pwd)/$backup_dir":/backup alpine tar xzf /backup/grafana-data.tar.gz -C /data
    fi
    
    print_success "Data restored from $backup_dir"
}

# Function to show help
show_help() {
    echo "PlayWithPro Production Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  deploy     Deploy to production (default)"
    echo "  stop       Stop production environment"
    echo "  restart    Restart production environment"
    echo "  status     Show production status"
    echo "  logs       Show production logs [SERVICE]"
    echo "  backup     Create backup of data"
    echo "  restore    Restore data from backup [BACKUP_DIR]"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy"
    echo "  $0 logs app"
    echo "  $0 backup"
    echo "  $0 restore backups/20231201_120000"
    echo ""
}

# Main script logic
main() {
    case "${1:-deploy}" in
        deploy)
            check_docker
            check_docker_compose
            check_resources
            create_directories
            stop_prod
            build_prod
            start_prod
            show_status
            ;;
        stop)
            stop_prod
            print_success "Production environment stopped."
            ;;
        restart)
            stop_prod
            sleep 5
            start_prod
            show_status
            ;;
        status)
            show_status
            ;;
        logs)
            show_logs "$2"
            ;;
        backup)
            backup_data
            ;;
        restore)
            restore_data "$2"
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
