import { Link } from "react-router-dom";
import Button from "../components/Button";
export default function NotFound(){return <div className="min-h-screen grid place-items-center bg-slate-50 p-4"><div className="text-center"><p className="text-6xl font-black text-blue-600">404</p><h1 className="mt-3 text-2xl font-black">Page not found</h1><p className="mt-2 text-sm text-slate-500">The page you requested doesn't exist.</p><Link to="/" className="mt-6 inline-block"><Button>Return home</Button></Link></div></div>}
