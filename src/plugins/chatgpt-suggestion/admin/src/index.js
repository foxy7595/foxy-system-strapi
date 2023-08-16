import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import MultiSelectIcon from "./components/MultiSelectIcon";
import getTrad from "./utils/getTrad";
import * as yup from "yup";
import { request } from "@strapi/helper-plugin";

const name = pluginPkg.strapi.name;

export default () => {
  return {
    async register(app) {
      const data = await request(
        "/api/chatgpt-suggestion/chatgpt-fill-type/find",
        {
          method: "GET",
        }
      );

      app.addMenuLink({
        to: `/plugins/${pluginId}`,
        icon: PluginIcon,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: name,
        },
        Component: async () => {
          const component = await import(
            /* webpackChunkName: "[request]" */ "./pages/App"
          );

          return component;
        },
        permissions: [
          // Uncomment to set the permissions of the plugin here
          // {
          //   action: '', // the action name should be plugin::plugin-name.actionType
          //   subject: null,
          // },
        ],
      });
      app.createSettingSection(
        {
          id: pluginId,
          intlLabel: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: `${pluginPkg.strapi.displayName} ${pluginPkg.strapi.kind}`,
          },
        },
        [
          {
            intlLabel: {
              id: `${pluginId}.plugin.name`,
              defaultMessage: "Configuration",
            },
            id: "chatgpt-suggestion",
            to: `/settings/${pluginId}`,
            // permissions: pluginPermissions.settingsRoles,
            Component: async () => {
              const component = await import(
                /* webpackChunkName: "stripe-page" */
                "./pages/Settings"
              );

              return component;
            },
          },
        ]
      );

      app.customFields.register({
        name: "chatgpt-suggestion",
        pluginId: "chatgpt-suggestion",
        type: "text",
        icon: MultiSelectIcon,
        intlLabel: {
          id: getTrad("input.label"),
          defaultMessage: "Chat GPT Input",
        },
        intlDescription: {
          id: getTrad("input.description"),
          defaultMessage: "Input",
        },
        // inputSize: {
        //   default: 12,
        // },
        components: {
          Input: async () => import("./components/ChatGPTInput"),
        },
        options: {
          base: [
            {
              sectionTitle: null,
              items: [
                {
                  name: "options.type",
                  type: "select",
                  value: "input",
                  defaultValue: "input",
                  options: [
                    {
                      key: "input",
                      defaultValue: "input",
                      value: "input",
                      metadatas: {
                        intlLabel: {
                          id: getTrad("type.input"),
                          defaultMessage: "Input",
                        },
                      },
                    },
                    {
                      key: "textarea",
                      value: "textarea",
                      metadatas: {
                        intlLabel: {
                          id: getTrad("type.textarea"),
                          defaultMessage: "Textarea",
                        },
                      },
                    },
                    {
                      key: "editor",
                      value: "editor",
                      metadatas: {
                        intlLabel: {
                          id: getTrad("type.editor"),
                          defaultMessage: "Base Editor",
                        },
                      },
                    },
                  ],
                  intlLabel: {
                    id: getTrad("type.label"),
                    defaultMessage: "Select a input type",
                  },
                  description: {
                    id: getTrad("type.description"),
                    defaultMessage: `ChatGPT suggestion will  response output in this input type
                    Choose 'input' type if the value is less than 255 characters (Title, description...) `,
                  },
                  placeholder: {
                    id: getTrad("type.placeholder"),
                    defaultMessage: "ex: input",
                  },
                },

                {
                  name: "options.sugguestNumber",
                  type: "select",
                  value: "5",
                  defaultValue: "5",
                  options: [
                    {
                      key: "sugguestNumber-2",
                      defaultValue: "5",
                      value: "2",
                      metadatas: {
                        intlLabel: {
                          id: getTrad("type.sugguestNumber-2"),
                          defaultMessage: "2",
                        },
                      },
                    },
                    {
                      key: "sugguestNumber-3",
                      value: "3",
                      metadatas: {
                        intlLabel: {
                          id: getTrad("type.sugguestNumber-3"),
                          defaultMessage: "3",
                        },
                      },
                    },
                    {
                      key: "sugguestNumber-5",
                      value: "5",
                      metadatas: {
                        intlLabel: {
                          id: getTrad("type.sugguestNumber-5"),
                          defaultMessage: "5",
                        },
                      },
                    },
                    {
                      key: "sugguestNumber-10",
                      value: "10",
                      metadatas: {
                        intlLabel: {
                          id: getTrad("type.sugguestNumber-10"),
                          defaultMessage: "10",
                        },
                      },
                    },
                  ],
                  intlLabel: {
                    id: getTrad("sugguestNumber.label"),
                    defaultMessage: "Select A Sugguest Number",
                  },
                  description: {
                    id: getTrad("sugguestNumber.description"),
                    defaultMessage: `Number of results when chat GPT response `,
                  },
                  placeholder: {
                    id: getTrad("sugguestNumber.placeholder"),
                    defaultMessage: "ex: sugguestNumber is 10",
                  },
                },

                {
                  name: "options.chatGPTType",
                  type: "select",
                  value: "",
                  defaultValue: "",
                  options: data
                    .sort((a, b) => a.order - b.order)
                    .map((item) => {
                      return {
                        key: "chatGPTType-" + item.id,
                        value: item.name,
                        metadatas: {
                          intlLabel: {
                            id: getTrad("chatGPTType-" + item.id),
                            defaultMessage: item.name,
                          },
                        },
                      };
                    }),
                  intlLabel: {
                    id: getTrad("chatGPTType.label"),
                    defaultMessage: "Select A ChatGPT Prompt Type",
                  },
                  description: {
                    id: getTrad("chatGPTType.description"),
                    defaultMessage: `ChatGPT prompt type  `,
                  },
                  placeholder: {
                    id: getTrad("chatGPTType.placeholder"),
                    defaultMessage: "ex: product:title",
                  },
                },
              ],
            },
          ],
          advanced: [
            {
              sectionTitle: {
                id: "global.settings",
                defaultMessage: "Settings",
              },
              items: [
                {
                  name: "required",
                  type: "checkbox",
                  intlLabel: {
                    id: "form.attribute.item.requiredField",
                    defaultMessage: "Required field",
                  },
                  description: {
                    id: "form.attribute.item.requiredField.description",
                    defaultMessage:
                      "You won't be able to create an entry if this field is empty",
                  },
                },
                {
                  name: "private",
                  type: "checkbox",
                  intlLabel: {
                    id: "form.attribute.item.private",
                    defaultMessage: "Private field",
                  },
                  description: {
                    id: "form.attribute.item.private.description",
                    defaultMessage:
                      "This field will not show up in the API response",
                  },
                },
              ],
            },
          ],
          validator: (args) => ({
            type: yup.string().required({
              id: "type.value.error",
              defaultMessage: "The type is required",
            }),
          }),
        },
      });

      app.registerPlugin({
        id: pluginId,
        initializer: Initializer,
        isReady: false,
        name,
      });
    },

    bootstrap(app) {},
    async registerTrads({ locales }) {
      const importedTrads = await Promise.all(
        locales.map((locale) => {
          return import(`./translations/${locale}.json`)
            .then(({ default: data }) => {
              return {
                data: prefixPluginTranslations(data, pluginId),
                locale,
              };
            })
            .catch(() => {
              return {
                data: {},
                locale,
              };
            });
        })
      );

      return Promise.resolve(importedTrads);
    },
  };
};
