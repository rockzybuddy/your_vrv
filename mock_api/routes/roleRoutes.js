const Role = require("../schema/Role");

module.exports = (app) => {
  // Helper function for error responses
  const handleError = (res, message, error) => {
    console.error(error);
    res.status(500).json({ message, error });
  };

  // Get all roles
  app.get("/api/roles", async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json({ roles });
    } catch (error) {
      handleError(res, "Failed to fetch roles", error);
    }
  });

  // Get a single role by ID
  app.get("/api/roles/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const role = await Role.findById(id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      handleError(res, "Failed to fetch the role", error);
    }
  });

  // Create a new role
  app.post("/api/roles", async (req, res) => {
    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({ message: "Name and permissions are required" });
    }

    try {
      const newRole = new Role({ name, permissions });
      await newRole.save();
      res.status(201).json({ message: "Role created successfully", role: newRole });
    } catch (error) {
      handleError(res, "Failed to create role", error);
    }
  });

  // Update an existing role
  app.put("/api/roles/:id", async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({ message: "Name and permissions are required" });
    }

    try {
      const updatedRole = await Role.findByIdAndUpdate(
        id,
        { name, permissions },
        { new: true, runValidators: true }
      );

      if (!updatedRole) return res.status(404).json({ message: "Role not found" });

      res.status(200).json({ message: "Role updated successfully", role: updatedRole });
    } catch (error) {
      handleError(res, "Failed to update role", error);
    }
  });

  // Delete a role
  app.delete("/api/roles/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRole = await Role.findByIdAndDelete(id);

      if (!deletedRole) return res.status(404).json({ message: "Role not found" });

      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      handleError(res, "Failed to delete role", error);
    }
  });
};
