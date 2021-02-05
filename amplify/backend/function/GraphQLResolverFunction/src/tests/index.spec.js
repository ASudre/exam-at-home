const {
  utils,
  appsync: { mockQuery },
  cognitoISP: { mockListUsers, mockListUsersInGroup },
} = require('./mocks');

const generateQuestionnaireReport = require('../src/queries/generateQuestionnaireReport');

describe('generateQuestionnaireReport', () => {
  beforeEach(() => {
    utils.restore();
  });

  it.each([[
    ['Raymond', 'Mariana'],
    [
      ['C', [['Raymond', 'B'], ['Mariana', 'A']]],
      ['A', [['Raymond', 'B'], ['Mariana', 'A']]],
    ],
    [
      ['Raymond', 'W', 'W', -1],
      ['Mariana', 'R', 'W', 2],
    ],
  ]])('should generate report', async (users, questions, result) => {
    // Given
    mockListUsers.mockResolvedValue(utils.formatUsers(users));
    mockQuery.mockResolvedValue(utils.formatQuestionnaire(questions));

    // When
    const res = await generateQuestionnaireReport({ arguments: { id: '' } });

    // Then
    expect(res).toEqual(utils.formatReport(result));
  });


  it('should remove admin and test users', async () => {
    // Given
    mockListUsers.mockResolvedValue(utils.formatUsers(['Raymond', 'Mariana+test', 'Admin']));
    mockListUsersInGroup.mockResolvedValue(utils.formatUsers(['Admin']));
    mockQuery.mockResolvedValue(utils.formatQuestionnaire([]));

    // When
    const res = await generateQuestionnaireReport({ arguments: { id: '' } });

    // Then
    expect(res).toEqual(`Username,Mark
Raymond,0`);
  });
});
