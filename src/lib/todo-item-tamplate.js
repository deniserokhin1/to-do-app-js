// eslint-disable-next-line no-unused-vars
const todoItemTamplate = (todo, id) => ({
  tag: 'li',
  cls: 'task-box-item',
  attrs: {
    draggable: 'true',
  },
  content: [
    {
      tag: 'label',
      cls: ['task-box-item__label', 'label'],
      attrs: {
        for: id,
      },
      content: [
        {
          tag: 'input',
          cls: ['task-box-item__input', 'input'],
          attrs: {
            type: 'checkbox',
            id: id,
            checked: `${todo.status}`,
          },
        },
        {
          tag: 'p',
          cls: ['task-box-item__text', 'text', `${todo.status}`],
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
              tag: 'i',
              cls: ['task-box-settings__icon', 'fa', 'fa-ellipsis-h'],
              attrs: {
                'aria-hidden': true,
              },
            },
            {
              tag: 'ul',
              cls: 'task-box-menu',
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
                      content: [
                        {
                          tag: 'span',
                          cls: ['delete__icon', 'delete'],
                          content: 'удалить',
                        },
                      ],
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
                      content: [
                        {
                          tag: 'span',
                          cls: ['delete__icon', 'edit'],
                          content: 'изменить',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          tag: 'i',
          cls: [
            'fa',
            'fa-arrows-v',
            'task-box-menu__icon-arrow',
            'icon-goup-item',
          ],
          attrs: {
            'aria-hidden': true,
          },
        },
      ],
    },
  ],
});
