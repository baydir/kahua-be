import inquirer from 'inquirer';
import Ora from 'ora';
import chalk from 'chalk';
import { connect } from 'mongoose';

export default class ModetikaConnection {
  constructor({ username, password, host }) {
    this.uri = `mongodb+srv://${username}:${password}@${host}`;
    this.cli = inquirer;
  }

  async init() {
    const spinner = new Ora('Attempting Connection');
    spinner.start();
    try {
      await connect(this.uri, {
        retryWrites: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      spinner.color = 'green';
      spinner.text = 'Connection Succesful!';
      spinner.succeed();
    } catch (error) {
      spinner.text = `${chalk.red(
        'An error ocurred, try again? :('
      )}: ${error}`;
      spinner.fail();
      process.exit(0);
    }
  }
}
