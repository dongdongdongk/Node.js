const bcrypt = require('bcrypt');

async function hashPassword(pw) {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  console.log('Generated Salt:', salt);

  const hash = await bcrypt.hash(pw, salt);
  console.log('Hashed Password:', hash);
}

async function login(pw, hashedPw) {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    console.log('LOGGED YOU IN! SUCCESSFUL MATCH!');
  } else {
    console.log('INCORRECT!');
  }
}

// 예제 실행
hashPassword('monkey');
login('monkey', 'hashed_password_from_database');