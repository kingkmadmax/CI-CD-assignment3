module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js'
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
};