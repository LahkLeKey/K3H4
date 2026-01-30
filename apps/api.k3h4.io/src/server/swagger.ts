import {type SwaggerOptions} from '@fastify/swagger';
import path from 'node:path';

const describe = {
  health: 'Health and diagnostics',
  auth: 'Authentication and session',
  profile: 'User profiles',
  bank: 'Banking and balances',
  persona: 'Persona management',
  assignment: 'Assignments and tasks',
  staffing: 'Workforce planning',
  freight: 'Freight and routing',
  warehouse: 'Inventory and storage',
  pointOfSale: 'Point of sale',
  agriculture: 'Agriculture simulator',
  culinary: 'Culinary simulator',
  arcade: 'Arcade simulator',
  usda: 'USDA data',
  wikidata: 'Wikidata REST cache',
  geo: 'Geospatial caches and lookups',
  maptiler: 'MapTiler Cloud API proxy',
  osrm: 'OSRM routing proxy',
  telemetry: 'Telemetry intake',
};

export const swaggerTags: Record < string, {
  name: string;
  description: string
}
> = {
  health: {name: 'Health', description: describe.health},
  auth: {name: 'Auth', description: describe.auth},
  profile: {name: 'Profile', description: describe.profile},
  bank: {name: 'Bank', description: describe.bank},
  persona: {name: 'Persona', description: describe.persona},
  assignment: {name: 'Assignment', description: describe.assignment},
  staffing: {name: 'Staffing', description: describe.staffing},
  freight: {name: 'Freight', description: describe.freight},
  warehouse: {name: 'Warehouse', description: describe.warehouse},
  pointOfSale: {name: 'Point of Sale', description: describe.pointOfSale},
  agriculture: {name: 'Agriculture', description: describe.agriculture},
  culinary: {name: 'Culinary', description: describe.culinary},
  arcade: {name: 'Arcade', description: describe.arcade},
  usda: {name: 'USDA', description: describe.usda},
  wikidata: {name: 'Wikidata', description: describe.wikidata},
  geo: {name: 'Geo', description: describe.geo},
  maptiler: {name: 'MapTiler', description: describe.maptiler},
  osrm: {name: 'OSRM', description: describe.osrm},
  telemetry: {name: 'Telemetry', description: describe.telemetry},
};

export const swaggerTagMap: Record < string, {
  name: string;
  description: string
}
> = {
  health: swaggerTags.health,
  auth: swaggerTags.auth,
  profile: swaggerTags.profile,
  telemetry: swaggerTags.telemetry,
  bank: swaggerTags.bank,
  persona: swaggerTags.persona,
  personas: swaggerTags.persona,
  assignment: swaggerTags.assignment,
  assignments: swaggerTags.assignment,
  staffing: swaggerTags.staffing,
  freight: swaggerTags.freight,
  warehouse: swaggerTags.warehouse,
  pos: swaggerTags.pointOfSale,
  pointOfSale: swaggerTags.pointOfSale,
  'point-of-sale': swaggerTags.pointOfSale,
  pointofsale: swaggerTags.pointOfSale,
  agriculture: swaggerTags.agriculture,
  culinary: swaggerTags.culinary,
  arcade: swaggerTags.arcade,
  usda: swaggerTags.usda,
  wikidata: swaggerTags.wikidata,
  geo: swaggerTags.geo,
  maptiler: swaggerTags.maptiler,
  osrm: swaggerTags.osrm,
};

export const docsStaticDir =
    path.join(process.cwd(), 'public', 'docs', 'static');

export const buildOpenApiOptions =
    (resolveServerUrl: () => string): SwaggerOptions => ({
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'K3H4 API',
          description:
              'API for K3H4 services. To authorize, sign in at https://www.k3h4.dev (or the dev frontend), open devtools > Application > Local Storage, and copy the value of k3h4.accessToken. Paste the token in Authorize; the UI will send it as a Bearer token automatically.',
          version: '0.1.0',
          contact: {
            name: 'Contact Kyle',
            url: 'https://www.k3h4.dev',
            email: 'Zephrym.MN@gmail.com',
          },
          license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
          },
        },
        servers: [
          {url: resolveServerUrl(), description: 'Active server'},
          {url: 'https://api.k3h4.dev', description: 'Production'},
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description:
                  'Paste your k3h4.accessToken; the UI prefixes Bearer for you.',
            },
          },
        },
        security: [{bearerAuth: []}],
        tags: Object.values(swaggerTags),
        externalDocs: {
          description: 'Frontend console and docs',
          url: 'https://www.k3h4.dev',
        },
      },
    });
