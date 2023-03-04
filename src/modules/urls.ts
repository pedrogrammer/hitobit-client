import { cookieStorage } from "./cookieStore";

type DomainName = "hitobit" | "poolkhord" | "mock";

class URLManager {
  private static domainName: DomainName;
  private static PREFIX_DEV = "dev";
  private static PREFIX_STAGE = "stage";
  private static PREFIX_TEST_STAGE = "test";
  private static PREFIX_TESTNET = "testnet";
  private static PREFIX_TESTDEV = "testdev";

  private static get API_DEV() {
    return `http://${URLManager.PREFIX_DEV}.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_STAGE() {
    return `http://${URLManager.PREFIX_STAGE}.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_STAGE_TEST() {
    return `http://${URLManager.PREFIX_TEST_STAGE}.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_TESTNET() {
    return `https://${URLManager.PREFIX_TESTNET}.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_TESTDEV() {
    return `http://${URLManager.PREFIX_TESTDEV}.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_PRODUCTION() {
    return `https://${URLManager.domainName}.com/hapi/`;
  }

  private static get CDN_DEV() {
    return `http://cdn.${URLManager.PREFIX_DEV}.${URLManager.domainName}.com`;
  }
  private static get CDN_STAGE() {
    return `http://cdn.${URLManager.PREFIX_STAGE}.${URLManager.domainName}.com`;
  }
  private static get CDN_STAGE_TEST() {
    return `http://cdn.${URLManager.PREFIX_STAGE}.${URLManager.domainName}.com`;
  }
  private static get CDN_TESTNET() {
    return `http://cdn.${URLManager.PREFIX_TESTNET}.${URLManager.domainName}.com`;
  }
  private static get CDN_TESTDEV() {
    return `http://cdn.${URLManager.PREFIX_TESTDEV}.${URLManager.domainName}.com`;
  }
  private static get CDN_PRODUCTION() {
    return `https://cdn.${URLManager.domainName}.com`;
  }

  private static get SIGNALR_DEV() {
    return `http://stream.${URLManager.PREFIX_DEV}.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_STAGE() {
    return `http://stream.${URLManager.PREFIX_STAGE}.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_STAGE_TEST() {
    return `http://stream.${URLManager.PREFIX_TEST_STAGE}.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_TESTNET() {
    return `https://stream.${URLManager.PREFIX_TESTNET}.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_TESTDEV() {
    return `http://stream.${URLManager.PREFIX_TESTDEV}.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_PRODUCTION() {
    return `https://stream.${URLManager.domainName}.com/stream`;
  }

  private static checkDomainName() {
    if (!URLManager.domainName) {
      throw new Error(
        `hitobit-cliient: domainName is not initialized run 'URLManager.setDomainName' in top level of your app`,
      );
    }
  }

  // Publics
  static setCustomPrefixes({
    dev,
    stage,
    testStage,
    testnet,
    testdev,
  }: {
    dev: string;
    stage: string;
    testnet: string;
    testdev: string;
    testStage: string;
  }) {
    URLManager.PREFIX_DEV = dev;
    URLManager.PREFIX_STAGE = stage;
    URLManager.PREFIX_TEST_STAGE = testStage;
    URLManager.PREFIX_TESTNET = testnet;
    URLManager.PREFIX_TESTDEV = testdev;
  }

  static setDomainName(domainName: DomainName) {
    URLManager.domainName = domainName;
  }
  static getDomainName() {
    return URLManager.domainName;
  }

  static get baseUrl() {
    URLManager.checkDomainName();

    if (!__PRODUCTION__ && !__TESTNET__) {
      const hapi =
        __PLATFORM__ === "web" && cookieStorage.getItem("hapiAddress");

      if (hapi) {
        return hapi;
      }
    }
    if (__STAGE__) {
      return URLManager.API_STAGE;
    }

    if (__STAGE_TEST__) {
      return URLManager.API_STAGE_TEST;
    }

    if (__TEST_DEV__) {
      return URLManager.API_TESTDEV;
    }

    if (__TESTNET__) {
      return URLManager.API_TESTNET;
    }
    if (__PRODUCTION__) {
      return URLManager.API_PRODUCTION;
    }

    return URLManager.API_DEV;
  }

  static get signalRBaseUrl() {
    URLManager.checkDomainName();

    if (!__PRODUCTION__ && !__TESTNET__) {
      const hapi =
        __PLATFORM__ === "web" && cookieStorage.getItem("streamAddress");

      if (hapi) {
        return hapi;
      }
    }

    if (__STAGE__) {
      return URLManager.SIGNALR_STAGE;
    }
    if (__STAGE_TEST__) {
      return URLManager.SIGNALR_STAGE_TEST;
    }
    if (__TESTNET__) {
      return URLManager.SIGNALR_TESTNET;
    }
    if (__TEST_DEV__) {
      return URLManager.SIGNALR_TESTDEV;
    }

    if (__PRODUCTION__) {
      return URLManager.SIGNALR_PRODUCTION;
    }

    return URLManager.SIGNALR_DEV;
  }

  static get CDNBaseUrl() {
    URLManager.checkDomainName();

    if (__STAGE__) {
      return URLManager.CDN_STAGE;
    }
    if (__STAGE_TEST__) {
      return URLManager.CDN_STAGE_TEST;
    }
    if (__TESTNET__) {
      return URLManager.CDN_TESTNET;
    }
    if (__TEST_DEV__) {
      return URLManager.CDN_TESTDEV;
    }

    if (__PRODUCTION__) {
      return URLManager.CDN_PRODUCTION;
    }

    return URLManager.CDN_DEV;
  }
}

if (__MOCK__) {
  URLManager.setDomainName("mock");
}

export { URLManager };
