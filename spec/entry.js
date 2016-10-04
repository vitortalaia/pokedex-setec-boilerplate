const specs = require.context('.', true, /\.spec$/);

specs.keys().forEach(specs);
