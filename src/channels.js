module.exports = function (app) {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on("connection", (connection) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel("anonymous").join(connection);
  });

  app.on("login", (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;
      console.log("masuk", user);

      // The connection is no longer anonymous, remove it
      app.channel("anonymous").leave(connection);

      // Add it to the authenticated user channel
      app.channel("authenticated").join(connection);
      app.channel("chat").join(connection);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(connection);
      // app.channel(`userIds/${user.id}`).join(connection);
    }
  });

  app.on("logout", (connection) => {
    // On a real-time logout, remove the connection from all channels
    if (connection) {
      const user = connection.user;
      console.log("keluar", user);
      app.channel("anonymous").leave(connection);
      app.channel("authenticated").leave(connection);
      app.channel("chat").leave(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    console.log(
      "Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information."
    ); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel("authenticated");
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });

  // app.service("rooms").on("created", (data, conn) => {
  //   const { connection } = conn.params;
  //   console.log("masuuuuuk", data);
  //   switch (data.action) {
  //     case "join":
  //       app.channel(`chat/${data.clientId}`).join(connection);
  //       return;
  //     case "leave":
  //       app.channel(`chat/${data.clientId}`).leave(connection);
  //       // app.channel(`user-list`).leave(connection);
  //       return;
  //     default:
  //       break;
  //   }
  // });

  // app.service("messages").publish("created", (data, conn) => {
  //   console.log("ini pesan", data);
  //   return app.channel(`chat`);
  // });

  // app.service("messages").publish("removed", (data, conn) => {
  //   return app.channel(`chat`);
  // });
};
