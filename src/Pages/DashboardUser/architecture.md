# Architecture du DashboardUser Refactorisé

## Diagramme d'Architecture

```mermaid
graph TD
    A[DashboardUser.jsx] --> B[useDashboard Hook]
    A --> C[Sidebar Component]
    A --> D[Header Component]
    A --> E[UserBanner Component]
    A --> F[WelcomeSection Component]
    A --> G[QuickStats Component]
    A --> H[GamingProSection Component]
    A --> I[Footer Component]
    A --> J[LoadingSpinner Component]
    A --> K[MobileMenuToggle Component]
    
    B --> L[constants.js]
    C --> L
    D --> L
    E --> L
    
    B --> M[State Management]
    B --> N[Event Handlers]
    B --> O[Performance Optimization]
    
    M --> P[activeNav]
    M --> Q[userType]
    M --> R[isLoading]
    M --> S[currentGame]
    M --> T[isMobileMenuOpen]
    M --> U[isGameDropdownOpen]
    
    N --> V[handleNavClick]
    N --> W[toggleMobileMenu]
    N --> X[toggleGameDropdown]
    N --> Y[selectGame]
    
    O --> Z[useCallback]
    O --> AA[useMemo]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style L fill:#e8f5e8
    style M fill:#fff3e0
    style N fill:#fce4ec
    style O fill:#f1f8e9
```

## Flux de Données

```mermaid
sequenceDiagram
    participant U as User
    participant D as DashboardUser
    participant H as useDashboard Hook
    participant C as Components
    
    U->>D: Interaction
    D->>H: State Update
    H->>D: New State
    D->>C: Props Update
    C->>U: UI Update
    
    Note over H: useCallback & useMemo<br/>Optimize Performance
    Note over C: ARIA Attributes<br/>Improve Accessibility
```

## Structure des Composants

```mermaid
graph LR
    subgraph "Main Components"
        A[DashboardUser]
    end
    
    subgraph "UI Components"
        B[Sidebar]
        C[Header]
        D[UserBanner]
        E[WelcomeSection]
        F[QuickStats]
        G[GamingProSection]
        H[Footer]
        I[LoadingSpinner]
        J[MobileMenuToggle]
    end
    
    subgraph "Logic Layer"
        K[useDashboard Hook]
        L[constants.js]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    A --> J
    
    A --> K
    K --> L
    B --> L
    C --> L
    D --> L
```

## Avantages de l'Architecture

### 🎯 **Séparation des Responsabilités**
- **Composants** : Interface utilisateur uniquement
- **Hooks** : Logique métier et état
- **Constantes** : Configuration centralisée

### ⚡ **Performance**
- `useCallback` pour les fonctions
- `useMemo` pour les valeurs calculées
- Composants optimisés pour éviter les re-renders

### ♿ **Accessibilité**
- Attributs ARIA appropriés
- Navigation au clavier
- Structure sémantique HTML5

### 🔧 **Maintenabilité**
- Code modulaire et réutilisable
- Tests unitaires facilités
- Documentation intégrée
