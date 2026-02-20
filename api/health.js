// API de Health Check
export default function handler(req, res) {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'API está funcionando corretamente'
  });
}
