import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import prisma from 'lib/prisma'

export default withApiAuthRequired(
  async function myApiRoute(req, res) {
    const session = getSession(req, res);
    
    let email = session?.user?.email;
    // email = 'laboratorioramos_tm@hotmail.com';

    const infopaciente: Array<any> = await prisma.$queryRaw`select  * from dbo.APP_VEntidad where Email= ${email}`;
    if (infopaciente.length == 0) res.json(null);
    else res.json(infopaciente[0]);
  }
);