export interface Usuario {
  id: number
  nombre: string
  email: string
  telefono?: string
  estado: 'activo' | 'inactivo' | 'suspendido'
  fecha_registro: string
  publicidades_compradas: number
  gasto_total: number
  comision_generada: number
  codigo_referido?: string
}

export interface Referido {
  id: number
  codigo: string
  nombre: string
  descripcion?: string
  comision: number
  creado: string
  usos: number
  estado: 'activo' | 'inactivo'
  ganancia_total?: number
}

export interface Comision {
  id: number
  usuario: string
  email: string
  gasto_publicidad: number
  comision_porcentaje: number
  comision_monto: number
  estado: 'pagado' | 'pendiente' | 'procesando'
  fecha_gasto: string
  fecha_pago?: string
  referido_codigo: string
}

export interface Admin {
  id: number
  nombre: string
  email: string
  telefono: string
  empresa: string
  sitio_web: string
  cuenta_banco: string
  banco: string
  comision_default: number
  metodo_pago: 'transferencia' | 'paypal' | 'stripe'
}
