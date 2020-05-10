import csv
import datetime

import speedtest
import os.path
from os import path


class speedtester:
    def __init__(self, csv_path: str):
        self.sp = speedtest.Speedtest()

        self.sp.get_servers([])
        self.sp.get_best_server()
        self.sp.download(threads=None)
        self.sp.upload(threads=None)
        self.path = csv_path
        self.writer = self.open_file()
        self.results = dict()

    def start_measurement(self):
        self.sp.results.share()
        self.results = self.sp.results.dict()
        self.results['datetime'] = datetime.datetime.now()
        print(self.results)

    def store_results(self):
        csv_dict = {
            'datetime': self.results['datetime'],
            'upload': self.results['upload'],
            'download': self.results['download'],
            'ping': self.results['ping']
        }

        self.writer.writerow(csv_dict)

    def open_file(self) -> csv.DictWriter:
        fieldnames = ['datetime', 'upload', 'download', 'ping']

        if not path.exists(self.path):
            f = open(self.path, 'w')
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            return writer
        else:
            f = open(self.path, 'a')
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            return writer


if __name__ == "__main__":
    print("Hello, I will test the speed. Please wait a while.")

    csv_path = os.environ.get('EXPORT_PATH')
    if csv_path is None:
        csv_path = "measurement/test.txt"

    tester = speedtester(csv_path)
    tester.start_measurement()
    tester.store_results()
    print(f"Iam done. Stored at '{csv_path}'")
