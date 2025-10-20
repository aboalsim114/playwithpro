# Intégration Formik dans PlayWithPro

## Vue d'ensemble

Ce document décrit l'intégration de Formik et Yup dans les formulaires de connexion et d'inscription de PlayWithPro. Cette intégration améliore la gestion des formulaires, la validation et l'expérience utilisateur.

## Architecture

### 1. Schémas de validation (`src/schemas/validationSchemas.js`)

Les schémas Yup définissent les règles de validation pour chaque formulaire :

- **`loginSchema`** : Validation pour la connexion (email, mot de passe, remember)
- **`registerSchema`** : Validation pour l'inscription (nom, username, email, mot de passe, âge, téléphone, conditions)
- **`forgotPasswordSchema`** : Validation pour la réinitialisation de mot de passe
- **`resetPasswordSchema`** : Validation pour le nouveau mot de passe

### 2. Composants Formik (`src/components/FormikField.jsx`)

Composants réutilisables pour les champs de formulaire :

- **`FormikInput`** : Champ de saisie avec gestion d'erreurs
- **`FormikPasswordField`** : Champ de mot de passe avec toggle de visibilité
- **`FormikCheckbox`** : Checkbox avec gestion d'erreurs
- **`FormikSubmitButton`** : Bouton de soumission avec état de chargement
- **`FormikGlobalError`** : Affichage des erreurs globales

### 3. Hook personnalisé (`src/hooks/useFormikForm.js`)

Hook pour simplifier l'utilisation de Formik avec Redux :

- **`createSubmitHandler`** : Gestionnaire de soumission avec Redux
- **`createValidationHandler`** : Validation en temps réel
- **Gestionnaires d'erreurs spécialisés** : Réseau, authentification, validation, etc.

## Utilisation

### Formulaire de connexion

```jsx
import { Formik, Form, Field } from 'formik';
import { loginSchema, initialValues, getFieldError, hasFieldError } from '../../schemas/validationSchemas';

<Formik
  initialValues={initialValues.login}
  validationSchema={loginSchema}
  onSubmit={handleLoginSubmit}
>
  {({ values, errors, touched, isSubmitting }) => (
    <Form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Field
          type="email"
          id="email"
          name="email"
          placeholder="votre@email.com"
          disabled={isSubmitting}
          className={hasFieldError(touched, errors, 'email') ? 'error' : ''}
        />
        {getFieldError(touched, errors, 'email') && (
          <div className="field-error">
            {getFieldError(touched, errors, 'email')}
          </div>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </button>
    </Form>
  )}
</Formik>
```

### Formulaire d'inscription

```jsx
import { Formik, Form, Field } from 'formik';
import { registerSchema, initialValues, getFieldError, hasFieldError } from '../../schemas/validationSchemas';

<Formik
  initialValues={initialValues.register}
  validationSchema={registerSchema}
  onSubmit={handleRegisterSubmit}
>
  {({ values, errors, touched, isSubmitting }) => (
    <Form>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nom complet</label>
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="Votre nom complet"
            disabled={isSubmitting}
            className={hasFieldError(touched, errors, 'name') ? 'error' : ''}
          />
          {getFieldError(touched, errors, 'name') && (
            <div className="field-error">
              {getFieldError(touched, errors, 'name')}
            </div>
          )}
        </div>
        {/* Autres champs... */}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Création du compte...' : 'Rejoindre l\'équipe'}
      </button>
    </Form>
  )}
</Formik>
```

## Fonctionnalités

### 1. Validation en temps réel

- Validation côté client avec Yup
- Messages d'erreur en français
- Validation des formats (email, téléphone, mot de passe)
- Validation des contraintes (âge, longueur, caractères spéciaux)

### 2. Gestion des erreurs

- **Erreurs de champ** : Affichage sous chaque champ
- **Erreurs globales** : Affichage en haut du formulaire
- **Erreurs serveur** : Mapping automatique vers les champs appropriés
- **Erreurs réseau** : Gestion des problèmes de connexion

### 3. États de chargement

- Désactivation des champs pendant la soumission
- Spinners de chargement sur les boutons
- Indicateurs visuels de progression

### 4. Accessibilité

- Labels associés aux champs
- Messages d'erreur accessibles
- Navigation au clavier
- Support des lecteurs d'écran

## Validation des mots de passe

### Règles de validation

- **Longueur** : Minimum 8 caractères, maximum 128
- **Complexité** : Au moins une majuscule, une minuscule, un chiffre, un caractère spécial
- **Sécurité** : Exclusion des mots de passe communs
- **Confirmation** : Correspondance avec le champ de confirmation

### Messages d'erreur

```javascript
// Exemples de messages d'erreur
"Le mot de passe doit contenir au moins 8 caractères"
"Le mot de passe doit contenir au moins une majuscule"
"Le mot de passe doit contenir au moins un chiffre"
"Le mot de passe doit contenir au moins un caractère spécial"
"Ce mot de passe est trop commun, veuillez en choisir un autre"
"Les mots de passe ne correspondent pas"
```

## Gestion des erreurs serveur

### Mapping automatique

```javascript
// Erreurs d'authentification
if (error.message?.includes('email')) {
  setFieldError('email', 'Email ou mot de passe incorrect');
}

// Erreurs d'inscription
if (error.message?.includes('email')) {
  setFieldError('email', 'Cette adresse email est déjà utilisée');
} else if (error.message?.includes('username')) {
  setFieldError('username', 'Ce nom d\'utilisateur est déjà pris');
}
```

### Types d'erreurs gérées

- **Erreurs réseau** : Problèmes de connexion
- **Erreurs serveur** : Erreurs 500+
- **Erreurs d'authentification** : 401, 403
- **Erreurs de validation** : 400, 422
- **Erreurs de rate limiting** : 429
- **Erreurs de maintenance** : 503

## Performance

### Optimisations

- **Validation différée** : Validation après interaction utilisateur
- **Debouncing** : Éviter les validations excessives
- **Memoization** : Composants optimisés avec React.memo
- **Lazy loading** : Chargement des schémas à la demande

### Bonnes pratiques

- Utiliser `useCallback` pour les handlers
- Éviter les re-renders inutiles
- Optimiser les schémas de validation
- Gérer les états de chargement efficacement

## Tests

### Tests unitaires

```javascript
// Test de validation
import { loginSchema } from '../schemas/validationSchemas';

test('valide un email correct', () => {
  const validData = {
    email: 'test@example.com',
    password: 'password123'
  };
  
  return loginSchema.validate(validData)
    .then(result => {
      expect(result).toEqual(validData);
    });
});

test('rejette un email invalide', () => {
  const invalidData = {
    email: 'invalid-email',
    password: 'password123'
  };
  
  return loginSchema.validate(invalidData)
    .catch(error => {
      expect(error.errors).toContain('Veuillez entrer une adresse email valide');
    });
});
```

### Tests d'intégration

```javascript
// Test de soumission de formulaire
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Connexion from '../Connexion';

test('soumet le formulaire avec des données valides', async () => {
  const mockStore = createMockStore();
  
  render(
    <Provider store={mockStore}>
      <Connexion />
    </Provider>
  );
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.change(screen.getByLabelText(/mot de passe/i), {
    target: { value: 'password123' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
  
  await waitFor(() => {
    expect(mockStore.getActions()).toContainEqual(
      expect.objectContaining({
        type: 'auth/loginUser/pending'
      })
    );
  });
});
```

## Maintenance

### Ajout de nouveaux champs

1. **Mettre à jour le schéma Yup** :
```javascript
export const newSchema = Yup.object().shape({
  newField: Yup.string().required('Ce champ est obligatoire')
});
```

2. **Ajouter les valeurs initiales** :
```javascript
export const initialValues = {
  newForm: {
    newField: ''
  }
};
```

3. **Mettre à jour le composant** :
```jsx
<Field
  type="text"
  name="newField"
  placeholder="Nouveau champ"
  className={hasFieldError(touched, errors, 'newField') ? 'error' : ''}
/>
```

### Modification des règles de validation

1. **Éditer le schéma** dans `validationSchemas.js`
2. **Tester les nouvelles règles**
3. **Mettre à jour les messages d'erreur**
4. **Vérifier l'accessibilité**

## Dépannage

### Problèmes courants

1. **Validation ne fonctionne pas** :
   - Vérifier que le schéma est correctement importé
   - S'assurer que les noms des champs correspondent

2. **Erreurs non affichées** :
   - Vérifier que `touched` est correctement géré
   - S'assurer que les composants d'erreur sont rendus

3. **Performance lente** :
   - Optimiser les schémas de validation
   - Utiliser `useCallback` pour les handlers
   - Éviter les re-renders inutiles

### Debug

```javascript
// Activer le mode debug de Formik
<Formik
  initialValues={initialValues.login}
  validationSchema={loginSchema}
  onSubmit={handleLoginSubmit}
  enableReinitialize={true}
  validateOnChange={true}
  validateOnBlur={true}
>
  {({ values, errors, touched, isSubmitting, setFieldValue, setFieldError }) => {
    // Debug
    console.log('Formik state:', { values, errors, touched, isSubmitting });
    
    return (
      <Form>
        {/* Formulaire */}
      </Form>
    );
  }}
</Formik>
```

## Conclusion

L'intégration de Formik et Yup dans PlayWithPro améliore significativement la gestion des formulaires en offrant :

- **Validation robuste** avec messages en français
- **Gestion d'erreurs avancée** pour tous les types d'erreurs
- **Expérience utilisateur optimisée** avec feedback en temps réel
- **Code maintenable** avec composants réutilisables
- **Performance optimisée** avec des bonnes pratiques React

Cette architecture permet une évolution facile des formulaires et une maintenance simplifiée.
