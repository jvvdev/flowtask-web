import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie, getCookies, setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const cookieService = await cookies()

    if (await getCookie('sessionId', { req, res })) {
        // se for no auth redireciona para a dashboard
        if (req.url.includes('/auth')) {
            return NextResponse.rewrite(new URL('/dashboard', req.url))
        }
    } else {
        // pega o session_id pelo google
        if (req.url.includes('?session_id=')) {
            const session_id = req.url.split('/dashboard?session_id=')[1];

            cookieService.set('sessionId', session_id, { secure: true, maxAge: 604800 })
            return NextResponse.rewrite(new URL('/dashboard', req.url))
        }

        return NextResponse.rewrite(new URL('/auth/login', req.url))
    }

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*']
}