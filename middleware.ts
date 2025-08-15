import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie, getCookies, setCookie } from 'cookies-next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    if (await getCookie('session_id', { req, res })) {
        console.log(await getCookies({ req, res }))
        console.log("caiu no maua")

        // se for no auth redireciona para a dashboard
        if (req.url.includes('/auth')) {
            return NextResponse.rewrite(new URL('/dashboard', req.url))
        }
    } else {
        // pega o session_id pelo google
        if (req.url.includes('?session_id=')) {
            const session_id = req.url.split('/dashboard?session_id=')[1];

            await setCookie('token', session_id, { res, req })
            console.log(await getCookies({ req, res }))
            return NextResponse.rewrite(new URL('/dashboard', req.url))
        }

        console.log(await getCookies({ req, res }))
        console.log("nao tem cookie")
        return NextResponse.rewrite(new URL('/auth/login', req.url))
    }

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*']
}