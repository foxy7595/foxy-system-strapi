"use strict";

module.exports = async ({ strapi }) => {
  try {
    const knex = strapi.db.connection;
    const roles = await strapi
      .query("plugin::users-permissions.role")
      .findMany({
        where: {
          type: { $in: ["public", "authenticated", "author"] },
        },
      });

    const roleMap = roles.reduce((objectRole, role) => {
      objectRole[role.type] = role.id;
      return objectRole;
    }, {});

    const contentTypeActionDefault = {
      "chatgpt-fill-type": {
        public: ["find"],
        authenticated: ["find"],
        author: ["find"],
      },
    };

    Object.keys(contentTypeActionDefault).forEach(async (contentType) => {
      const result = await knex.raw(
        `
        SELECT type,action
        FROM up_roles AS role
        LEFT JOIN up_permissions_role_links AS role_links ON role.id = role_links.role_id
        JOIN up_permissions AS permission ON permission.id = role_links.permission_id
        WHERE permission.action LIKE '%plugin::chatgpt-suggestion.${contentType}%'
      `
      );

      const currentContentType = contentTypeActionDefault[contentType];
      Object.keys(currentContentType).forEach((type) => {
        currentContentType[type].forEach(async (action) => {
          if (
            !result.rows.find(
              (item) =>
                item.type === type &&
                item.action ==
                  `plugin::chatgpt-suggestion.${contentType}.${action}`
            )
          ) {
            const newPermission = await strapi
              .query("plugin::users-permissions.permission")
              .create({
                data: {
                  action: `plugin::chatgpt-suggestion.${contentType}.${action}`,
                },
              });

            const permissionId = newPermission.id;
            const query = `
            INSERT INTO up_permissions_role_links (role_id, permission_id, permission_order)
            VALUES (${roleMap[type]}, ${permissionId}, ${permissionId})
          `;
            await knex.raw(query);
          }
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
};
