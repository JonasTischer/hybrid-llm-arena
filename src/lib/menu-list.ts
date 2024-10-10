import {
  Tag,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '',
          label: 'LLM APIs',
          active: pathname.includes('/llm-apis'),
          icon: SquarePen,
          submenus: [
            {
              href: '/llm-apis',
              label: 'LLM APIs',
            },
            {
              href: '/evaluators',
              label: 'Evaluators',
            },
          ],
        },
        {
          href: '/prompt-collections',
          label: 'Prompt Collections',
          active: pathname.includes('/prompt-collections'),
          icon: Bookmark,
        },
        {
          href: '/tags',
          label: 'Tags',
          active: pathname.includes('/tags'),
          icon: Tag,
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/account',
          label: 'Account',
          active: pathname.includes('/account'),
          icon: Settings,
        },
      ],
    },
  ];
}
