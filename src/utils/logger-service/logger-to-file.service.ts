import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { EOL } from 'node:os';
import { Dirent, mkdir, writeFileSync } from 'node:fs';
import { Injectable } from '@nestjs/common';

const BYTES_IN_KB = 1024;
const FILE_SIZE_KB = Number(process.env.FILE_SIZE_KB) || 10;

@Injectable()
export class LoggerToFileService {
  static syncErrorWriter(data: string): void {
    const PATH = path.join(__dirname, '../../', `logs`);
    mkdir(PATH, { recursive: true }, (err) => console.error(err));
    writeFileSync(`${PATH}/critical_errors.log`, `${data}${EOL}`, {
      flag: 'a+',
    });
  }

  async write(data: string): Promise<void> {
    const PATH = path.join(
      __dirname,
      '../../',
      `logs/${new Date().toISOString()}`,
    );

    await fs.mkdir(PATH, { recursive: true });
    const files = await fs.readdir(PATH, { withFileTypes: true });

    const fileToWrite = await this.asyncFindFile<Dirent>(
      files,
      async (file) => {
        const stats = await fs.stat(path.join(PATH, file.name));
        return stats.size / BYTES_IN_KB < FILE_SIZE_KB;
      },
    );

    if (fileToWrite !== undefined) {
      await this.fileWriter(path.join(PATH, fileToWrite.name), data);
    } else {
      await this.fileWriter(
        path.join(PATH, `${new Date().toISOString()}-${files.length + 1}.log`),
        data,
      );
    }
  }

  async fileWriter(path: string, data: string): Promise<void> {
    await fs.writeFile(path, `${data}${EOL}`, {
      flag: 'a+',
    });
  }

  async asyncFindFile<T>(
    files: T[],
    cb: (file: T) => Promise<boolean>,
  ): Promise<T | undefined> {
    const results = await Promise.all(files.map(cb));
    const i = results.findIndex((result) => result);
    return ~i ? files[i] : undefined;
  }
}
