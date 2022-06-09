import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
// import prisma from 'lib/prisma'

// export default withApiAuthRequired(async function myApiRoute(req, res) {
//   const session = getSession(req, res);
//   let email = session?.user.email;
//   // email = 'laboratorioramos_tm@hotmail.com';

//   const { IDia, IMes, IYear, FDia, FMes, FYear, Servicios, Pagina } = req.body;
//   let filtroServicios = "";
//   Object.keys(Servicios).forEach((key) => {
//     if (Servicios[key]) filtroServicios = filtroServicios + "," + key;
//   });
//   if (!filtroServicios) filtroServicios = "LA,RX,EC,TM,RE,BI";

//   const query = `
//     exec [dbo].[APP_spVResultadoPaciente] 
//     '${email}','${IDia}','${IMes}','${IYear}','${FDia}','${FMes}','${FYear}','${filtroServicios}','${Pagina}'`;
//   const resultadoBD = await prisma.$queryRawUnsafe(query);

//   res.status(200).json(resultadoBD);
// })
