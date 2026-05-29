export const colors = {
    // Primaires
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',

    // Neutres
    white: '#ffffff',
    black: '#000000',
    gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
    }
};

export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px'
};

export const borderRadius = {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px'
};

export const shadows = {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 4px rgba(0,0,0,0.1)',
    lg: '0 4px 8px rgba(0,0,0,0.15)',
    xl: '0 8px 16px rgba(0,0,0,0.2)'
};

// Composants de base
export const card = {
    padding: spacing.lg,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.lg,
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

export const button = {
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
};

export const input = {
    padding: spacing.md,
    border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.md,
    fontSize: '14px',
    width: '100%'
};

export const label = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
    fontSize: '14px',
    color: colors.gray[700]
}