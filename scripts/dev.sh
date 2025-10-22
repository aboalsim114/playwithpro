#!/bin/bash

# ===========================================
# PlayWithPro - Development Script
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

# Function to clean up previous containers
cleanup() {
    print_status "Cleaning up previous containers..."
    docker-compose --profile dev down --remove-orphans 2>/dev/null || true
}

# Function to build and start development environment
start_dev() {
    print_status "Building development image..."
    docker-compose --profile dev build --no-cache
    
    print_status "Starting development environment..."
    docker-compose --profile dev up -d
    
    print_status "Waiting for application to start..."
    sleep 10
    
    # Check if application is running
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Development environment is running!"
        print_success "Application is available at: http://localhost:3000"
    else
        print_warning "Application might still be starting. Please check the logs:"
        print_warning "docker-compose --profile dev logs -f"
    fi
}

# Function to show logs
show_logs() {
    print_status "Showing application logs..."
    docker-compose --profile dev logs -f
}

# Function to stop development environment
stop_dev() {
    print_status "Stopping development environment..."
    docker-compose --profile dev down
    print_success "Development environment stopped."
}

# Function to show help
show_help() {
    echo "PlayWithPro Development Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Start development environment"
    echo "  stop      Stop development environment"
    echo "  restart   Restart development environment"
    echo "  logs      Show application logs"
    echo "  clean     Clean up containers and images"
    echo "  help      Show this help message"
    echo ""
}

# Function to clean everything
clean_all() {
    print_status "Cleaning up all Docker resources..."
    docker-compose --profile dev down --remove-orphans --volumes
    docker system prune -f
    print_success "Cleanup completed."
}

# Main script logic
main() {
    case "${1:-start}" in
        start)
            check_docker
            check_docker_compose
            cleanup
            start_dev
            ;;
        stop)
            stop_dev
            ;;
        restart)
            stop_dev
            sleep 2
            start_dev
            ;;
        logs)
            show_logs
            ;;
        clean)
            clean_all
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
