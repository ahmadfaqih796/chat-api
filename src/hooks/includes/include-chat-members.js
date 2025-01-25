const { mergeWithKey, concat, where } = require("ramda");

const concatValue = (k, l, r) => (k === "include" ? concat(l, r) : r);

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    const { params, app } = context;
    const { query } = params;

    const sequelize = app.get("sequelizeClient");
    const { chat_members, users } = sequelize.models;

    const whereUserOptions = {};
    const whereMemberOptions = {};

    const userId = query.user_id;
    if (userId) {
      whereMemberOptions.user_id = userId;
      whereUserOptions.id = {
        $ne: userId,
      };
      delete context.params.query.user_id;
    }

    const include = [
      {
        attributes: ["id", "user_id"],
        model: chat_members,
        as: "members",
        where: whereMemberOptions,
        // include: [
        //   {
        //     attributes: ["id", "email", "fullname"],
        //     model: users,
        //     as: "user",
        //     // where: whereUserOptions,
        //   },
        // ],
      },
    ];

    const sequelizeOptions = mergeWithKey(
      concatValue,
      context.params.sequelize || {},
      {
        include,
        raw: false,
        order: [["created_at", "ASC"]],
      }
    );

    context.params.sequelize = sequelizeOptions;

    return context;
  };
};
