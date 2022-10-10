export const behaviorAttributes = [
  {
    id: 'open_mind',
    options: [
      {
        id: 'open',
        category: 'open_mind',
        title: 'Aberto',
        action: +1,
      },
      {
        id: 'closed',
        category: 'open_mind',
        title: 'Fechado',
        action: -1,
      },
    ],
  },
  {
    id: 'friendly',
    options: [
      {
        id: 'friendly',
        category: 'friendly',
        title: 'Amigável',
        action: +1,
      },
      {
        id: 'rude',
        category: 'friendly',
        title: 'Rude',
        action: -1,
      },
    ],
  },
  {
    id: 'perception',
    options: [
      {
        id: 'attentive',
        category: 'perception',
        title: 'Atento',
        action: +1,
      },
      {
        id: 'inattentive',
        category: 'perception',
        title: 'Desatento',
        action: -1,
      },
    ],
  },
  {
    id: 'dedication',
    options: [
      {
        id: 'dedicated',
        category: 'dedication',
        title: 'Dedicado',
        action: +1,
      },
      {
        id: 'smug',
        category: 'dedication',
        title: 'Presunçoso',
        action: -1,
      },
    ],
  },
  {
    id: 'organization',
    options: [
      {
        id: 'organized',
        category: 'organization',
        title: 'Organizado',
        action: +1,
      },
      {
        id: 'disorganized',
        category: 'organization',
        title: 'Desorganizado',
        action: -1,
      },
    ],
  },
]

export const behaviorAttributeCategories =
  'dedication' || 'friendly' || 'open_mind' || 'organization' || 'perception'
