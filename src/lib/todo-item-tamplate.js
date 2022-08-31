// eslint-disable-next-line no-unused-vars
const todoItemTamplate = (todo, id) => ({
  tag: 'li',
  cls: 'task-box-item',
  content: [
    {
      tag: 'label',
      cls: ['task-box-item__label', 'label', 'updatestatus'],
      attrs: {
        for: id,
      },
      content: [
        {
          tag: 'input',
          cls: ['task-box-item__input', 'input', 'updatestatus'],
          attrs: {
            type: 'checkbox',
            id: id,
            checked: `${todo.status}`,
          },
        },
        {
          tag: 'p',
          cls: [
            'task-box-item__text',
            'text',
            `${todo.status}`,
            'updatestatus',
          ],
          content: todo.name,
        },
      ],
    },
    {
      tag: 'div',
      cls: 'task-box-item__icon-goup',
      content: [
        {
          tag: 'div',
          cls: ['task-box-settings', 'icon-goup-item'],
          content: [
            {
              tag: 'label',
              cls: 'task-box-settings__label',
              attrs: {
                for: Number(id + 1000),
              },
              content: [
                {
                  tag: 'i',
                  cls: ['task-box-settings__icon', 'fa', 'fa-ellipsis-h'],
                  attrs: {
                    'aria-hidden': true,
                  },
                },
                {
                  tag: 'input',
                  cls: 'input-radio',
                  attrs: {
                    type: 'radio',
                    id: Number(id + 1000),
                    name: 'radio',
                  },
                },
              ],
            },
            {
              tag: 'ul',
              cls: ['task-box-menu'],
              content: [
                {
                  tag: 'li',
                  cls: ['task-box-menu__list', 'delete'],
                  content: [
                    {
                      tag: 'i',
                      cls: ['task-box-menu__icon', 'delete', 'fa', 'fa-times'],
                      attrs: {
                        'aria-hidden': true,
                      },
                    },
                  ],
                },
                {
                  tag: 'li',
                  cls: ['task-box-menu__list', 'edit'],
                  content: [
                    {
                      tag: 'i',
                      cls: ['task-box-menu__icon', 'edit', 'fa', 'fa-pencil'],
                      attrs: {
                        'aria-hidden': true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          tag: 'i',
          cls: ['fa', 'fa-arrow-up', 'task-box-menu__icon-arrow'],
          attrs: {
            'aria-hidden': true,
            id: id,
          },
        },
      ],
    },
  ],
});
