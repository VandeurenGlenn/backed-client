(function () {
'use strict';

Backed(class BackedClient extends HTMLElement {
  static get properties() {
    return {
      backedNpmFile: {
        observer: 'fileChange'
      },
      npmFile: {
        observer: 'fileChange'
      },
      name: {
        observer: 'nameChange'
      },
      version: {
        observer: 'versionChange'
      },
      backedVersion: {
        observer: 'backedVersionChange'
      }
    };
  }
  connected() {
    try {
      this.getBackedNpmFile();
      this.getNpmFile();
    } catch (error) {
      console.warn(error);
    }
  }
  request(url, cb) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = cb;
    xhttp.open('GET', url, true);
    xhttp.send();
  }
  getBackedNpmFile() {
    this.request('/node_modules/backed/package.json', event => {
      const target = event.target;
      if (target.readyState == 4 && target.status == 200) {
        this.backedNpmFile = JSON.parse(target.response);
      }
    });
  }
  getNpmFile() {
    this.request('/package.json', event => {
      const target = event.target;
      if (target.readyState == 4 && target.status == 200) {
        this.npmFile = JSON.parse(target.response);
      }
    });
  }
  fileChange(change) {
    if (this.npmFile && this.backedNpmFile) {
      this.name = this.npmFile.name;
      this.version = this.npmFile.version;
      this.backedVersion = this.backedNpmFile.version;
    }
  }
  nameChange(change) {
    this.querySelector('.project').innerHTML = `${change.value}`;
  }
  versionChange(change) {
    this.querySelector('.project-version').innerHTML = `${change.value}`;
  }
  backedVersionChange(change) {
    this.querySelector('.project-version.backed').innerHTML = `${change.value}`;
  }
});

}());
//# sourceMappingURL=backed-client.js.map
