const db = require('./src/db');
const bcrypt = require('bcryptjs');

function seed() {
  const adminPass = bcrypt.hashSync('admin123', 8);
  const userPass = bcrypt.hashSync('user123', 8);

  db.serialize(() => {
    db.run('DELETE FROM users');
    db.run('DELETE FROM products');
    db.run('DELETE FROM movements');

    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', adminPass, 'admin']);
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['user', userPass, 'user']);

    const stmt = db.prepare('INSERT INTO products (name, quantity, price, category, image) VALUES (?, ?, ?, ?, ?)');
    stmt.run('Parafuso 4mm', 120, 0.05, 'Ferragens', '');
    stmt.run('Prego 6cm', 300, 0.03, 'Ferragens', '');
    stmt.run('Parafuso Allen', 60, 0.4, 'Ferragens', '');
    stmt.finalize(() => {
      console.log('Seed concluído. Usuário: admin/admin123 e user/user123');
      process.exit(0);
    });
  });
}

seed();
