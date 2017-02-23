'use strict';
Backed(class BackedClient extends HTMLElement {

  static get properties() {
    return {
      backedNpmFile: {
        observer: 'fileChange'
      },

      bowerFile: {
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
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    // let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = this.xhttpOnReadyStateChange;
    try {
      this.getBackedNpmFile();
      this.getNpmFile();
      this.getBowerFile();
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
    this.request('/backed/package.json', (event) => {
      const target = event.target;
      if (target.readyState == 4 && target.status == 200) {
        this.backedNpmFile = JSON.parse(target.response);
      }
    });
  }

  getBowerFile() {
    this.request('/bower.json', (event) => {
      const target = event.target;
      if (target.readyState == 4 && target.status == 200) {
        this.bowerFile = JSON.parse(target.response);
      }
    });
  }

  getNpmFile() {
    this.request('/package.json', (event) => {
      const target = event.target;
      if (target.readyState == 4 && target.status == 200) {
        this.npmFile = JSON.parse(target.response);
      }
    });
  }

  fileChange(change) {
    if (this.bowerFile && this.npmFile && this.backedNpmFile) {
      this.name = this.bowerFile.name || this.npmFile.name;
      // const authors = this.bowerFile.authors || this.npmFile.authors;
      // const homepage = this.bowerFile.homepage || this.npmFile.homepage;
      this.version = this.bowerFile.version || this.npmFile.version;
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
})
