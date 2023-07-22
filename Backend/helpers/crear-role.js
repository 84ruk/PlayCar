const Role = require('./models/Role');

const crearRole = async () => {
  try {
    const roles = ['ADMIN_ROLE', 'USER_ROLE'];

    for (const rol of roles) {
      const existeRol = await Role.findOne({ rol });

      if (!existeRol) {
        const nuevoRol = new Role({ rol });
        await nuevoRol.save();
        console.log(`Rol '${rol}' creado`);
      }
    }
  } catch (error) {
    console.error('Error al crear los roles:', error);
  }
};

module.exports = crearRole;
