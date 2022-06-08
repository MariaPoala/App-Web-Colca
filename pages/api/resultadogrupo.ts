import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import prisma from 'lib/prisma'

export default withApiAuthRequired(
  async function myApiRoute(req, res) {
    const session = getSession(req, res);

    let email = session?.user?.email;
    // email = 'laboratorioramos_tm@hotmail.com';

    const { IDia, IMes, IYear, FDia, FMes, FYear } = req.body;
    const resultadoBD = await prisma.$queryRawUnsafe(`
  exec [dbo].[APP_spResultadoPacienteGrupo] 
  '${email}','${IDia}','${IMes}','${IYear}','${FDia}','${FMes}','${FYear}'`);
    res.status(200).json(resultadoBD);
  }
)
