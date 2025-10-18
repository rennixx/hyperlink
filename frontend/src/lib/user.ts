// Simple user identity management using localStorage
// For MVP - just tracks username locally

export const getCurrentUser = (): string => {
  const saved = localStorage.getItem('hyperlink_user');
  if (saved) {
    return saved;
  }
  return 'anonymous';
};

export const setCurrentUser = (username: string): void => {
  if (username.trim()) {
    localStorage.setItem('hyperlink_user', username.trim());
  } else {
    localStorage.setItem('hyperlink_user', 'anonymous');
  }
};

export const isConceptOwnedByUser = (conceptCreatedBy: string): boolean => {
  const currentUser = getCurrentUser();
  return conceptCreatedBy === currentUser;
};
