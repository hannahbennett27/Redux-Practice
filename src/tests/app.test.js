test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});
