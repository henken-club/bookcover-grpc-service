import {Server, ServerCredentials} from '@grpc/grpc-js';

import {BookcoverService} from './protogen/bookcover';
import {handler as findFromISBN} from './isbn';

function main() {
  const server = new Server();

  server.addService(BookcoverService, {findFromISBN});
  server.bindAsync(
    // eslint-disable-next-line no-process-env
    `0.0.0.0:${process.env.PORT || 5000}`,
    ServerCredentials.createInsecure(),
    () => {
      server.start();
    },
  );
}
main();
