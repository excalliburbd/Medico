(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const indexRoutes = require('./routes/index');
    const authRoutes = require('./routes/auth');
    const userRoutes = require('./routes/user');
    const chatroomRoutes = require('./routes/chatroom');

    // *** register routes *** //
    app.use('/', indexRoutes);
    app.use('/auth', authRoutes);
    app.use('/', userRoutes);
    app.use('/chatroom', chatroomRoutes)    
  };

})(module.exports);