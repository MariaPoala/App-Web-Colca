create view v_documento
as
select 
doc.id,
to_char(doc.fecha_creacion, 'DD/MM/YYYY') as fecha_creacion,
to_char(doc.fecha_edicion, 'DD/MM/YYYY') as fecha_edicion,
doc.numero_documento,
doc.observacion,
to_char(doc.fecha_documento, 'DD/MM/YYYY') as fecha_documento,
doc.url_archivo,
doc.es_anulado,
to_char(doc.fecha_anulacion, 'DD/MM/YYYY') as fecha_anulacion,
doc.motivo_anulacion,
doc.id_empleado, empleado.nombre as empleado_nombre,
doc.id_empresa,empresa.razon_social as empresa_razon_social,
doc.id_persona,persona.nombre as persona_nombre,
doc.id_tipo_documento,tipo.nombre as tipo_documento_nombre
from documento as doc
inner join tipo_documento as tipo on doc.id_tipo_documento=tipo.id
inner join empleado as empleado on doc.id_empleado=empleado.id
inner join empresa as empresa on doc.id_empresa=empresa.id
inner join persona as persona on doc.id_persona=persona.id