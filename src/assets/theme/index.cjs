const newComponents = ({ addComponents, theme }) => {
  addComponents({
    '.btn': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '.5rem 1rem !important',
      borderRadius: '.25rem !important',
      fontSize: theme('fontSize.sm'),
      fontWeight: '600 !important',
      color: 'white',
    },
    // ...
  });
};

//  @apply  px-2 py-1 capitalize transition-all duration-200 border-2 border-transparent rounded shadow-sm md:px-3 bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base;

const styleBase = ({ addBase, theme }) => {
  addBase({
    h1: {
      fontSize: theme('fontSize.4xl'),
      fontWeight: theme('fontWeight.extrabold'),
    },
    h2: {
      fontSize: theme('fontSize.3xl'),
      fontWeight: theme('fontWeight.bold'),
    },
    h3: {
      fontSize: theme('fontSize.2xl'),
      fontWeight: theme('fontWeight.bold'),
    },
    h4: {
      fontSize: theme('fontSize.xl'),
      fontWeight: theme('fontWeight.semibold'),
    },
    h5: {
      fontSize: theme('fontSize.lg'),
      fontWeight: theme('fontWeight.semibold'),
    },
  });
};

module.exports = { newComponents, styleBase };
