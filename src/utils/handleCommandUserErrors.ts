export const handleCommandUserErrors = (errorIdentifier: string) => {
  switch (errorIdentifier) {
    case 'memberError': {
      return 'Oznacz użytkownika jako pierwszy argument.';
    }
    case 'argsMissing': {
      return 'Nie podałeś argumentów! Jako pierwszy argument oznacz użytkownika, któremu dziękujesz, a jako drugi argument jeżeli chcesz, wiadomość za co mu dziekujesz.';
    }
    default: {
      return 'Coś poszło nie tak! Oznacz admina Survi i go uderz w głowę.';
    }
  }
};
