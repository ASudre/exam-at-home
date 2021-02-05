const { getQuestionnaireWithQuestions } = require('../services/appSync.service');
const { listGroupUsers, listUsers } = require('../services/cognitoISP.service');

module.exports = async (ctx) => {
  const { id } = ctx.arguments;
  const scale = {
    'N/A': 0,
    R: 2.5,
    W: -0.5,
  };

  const users = await listUsers();
  console.log('users', JSON.stringify(users));
  const adminUsers = await listGroupUsers('Admin');
  console.log('admin users', JSON.stringify(adminUsers));
  const notAdminAndNotTestUsers = users.filter((u) => !(adminUsers.includes(u) || u.includes('+test')));

  const { questions } = await getQuestionnaireWithQuestions({ id });
  console.log('questions', JSON.stringify(questions));
  if (!questions) {
    return '';
  }
  const sortedQuestions = questions
    .items
    .sort((q1, q2) => (q1.createdAt > q2.createdAt ? 1 : -1));

  const header = ['Username', ...sortedQuestions.map((_, i) => `Q${i + 1}`), 'Mark'];

  const rows = notAdminAndNotTestUsers.map((u) => {
    const answers = sortedQuestions.map((q) => {
      const answerObj = q.answers.items.find((a) => a.owner === u);
      if (!answerObj) {
        return 'N/A';
      }
      return answerObj.answer === q.answer ? 'R' : 'W';
    });
    const mark = answers.reduce((acc, a) => acc + scale[a], 0);
    return [u, ...answers, mark];
  });

  return [header, ...rows].map((r) => r.join(',')).join('\n');
};
