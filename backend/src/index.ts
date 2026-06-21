import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('############################################');
    console.log('BOOTSTRAP FUNCTION IS RUNNING');
    console.log('############################################');
    try {
      // Find the Public role
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const actionsToCheck = [
          'api::proyecto.proyecto.find',
          'api::proyecto.proyecto.findOne',
          'api::producto.producto.find',
          'api::producto.producto.findOne',
          'api::categoria.categoria.find',
          'api::categoria.categoria.findOne',
        ];

        // Check which permissions already exist
        const existingPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
          where: {
            role: publicRole.id,
            action: {
              $in: actionsToCheck,
            },
          },
        });

        const existingActions = existingPermissions.map((p: any) => p.action);
        const actionsToAdd = actionsToCheck.filter((action) => !existingActions.includes(action));

        if (actionsToAdd.length > 0) {
          await strapi.db.query('plugin::users-permissions.permission').createMany({
            data: actionsToAdd.map((action) => ({
              action,
              role: publicRole.id,
            })),
          });
          strapi.log.info(`[Bootstrap] Added public permissions for: ${actionsToAdd.join(', ')}`);
        } else {
            strapi.log.info('[Bootstrap] Public permissions already set.');
        }
      }
    } catch (error) {
      strapi.log.error('[Bootstrap] Error setting permissions:', error);
    }
  },
};
