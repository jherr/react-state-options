const { faker } = require("@faker-js/faker");
const { isEqual, cloneDeep } = require("lodash");

const createRandomUser = () => ({
  userId: faker.string.uuid(),
  bio: {
    birthdate: faker.date.birthdate(),
  },
  contact: {
    email: faker.internet.email(),
  },
  avatar: {
    url: faker.image.avatar(),
  },
  security: {
    password: faker.internet.password(),
  },
  registeredAt: faker.date.past(),
});

const addAndCompareReference = (original) => {
  const newUser = {
    ...original,
    name: "John Doe",
  };
  return original === newUser;
};

const addAndCompareDeepcopy = (original) => {
  // Simulates pulling a mutable copy
  const user = cloneDeep(original);
  // Mutating
  user.name = "John Doe";
  // Comparing the arrays by content
  return isEqual(original, user);
};

const performanceTest = (fn, iterations = 100000) => {
  const newUser = createRandomUser();
  const originalValues = new Array(iterations)
    .fill(0)
    .map(() => cloneDeep(newUser));

  const start = performance.now();
  originalValues.forEach((user) => fn(user));
  return (performance.now() - start) / iterations;
};

console.log(
  `reference compare = ${(
    performanceTest(addAndCompareReference) * 1000
  ).toFixed(3)}μs`
);

console.log(
  `deepcopy compare = ${(performanceTest(addAndCompareDeepcopy) * 1000).toFixed(
    3
  )}μs`
);
