import * as migration_20261009_063207_initial from './20261009_063207_initial';
import * as migration_20261102_184647_online_classes from './20261102_184647_online_classes';

export const migrations = [
  {
    up: migration_20261009_063207_initial.up,
    down: migration_20261009_063207_initial.down,
    name: '20261009_063207_initial',
  },
  {
    up: migration_20261102_184647_online_classes.up,
    down: migration_20261102_184647_online_classes.down,
    name: '20261102_184647_online_classes'
  },
];
