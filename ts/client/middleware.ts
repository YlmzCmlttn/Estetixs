import { NextRequest, NextResponse } from 'next/server';

const AUTH_PAGES = ['/login', '/register', '/forgot-password'];
const DOCTOR_PAGES = [
  '/dashboard/patient-list',
  '/dashboard/booking',
];
const isAuthPages = (url: URL) =>
  AUTH_PAGES.some((page) => url.pathname.startsWith(page));

const isDoctorPages = (url: URL) =>
  DOCTOR_PAGES.some((page) => url.pathname.startsWith(page));

export async function middleware(req: NextRequest) {
  console.log('middleware');
  const { url, nextUrl, cookies } = req;
  const { value: session_id } = cookies.get('_session_id') ?? { value: null };
  const searchParams = new URLSearchParams(nextUrl.search);

  if (!session_id) {
    if (isAuthPages(nextUrl)) {
      return NextResponse.next();
    }
    searchParams.set('next', nextUrl.pathname);
    return NextResponse.redirect(new URL(`/login?${searchParams}`, req.url));
  }

  let response;
  try {
    response = await fetch('http://api:4000/api/auth/me', {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Cookie: `session_id=${session_id}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user data');
  } catch (error) {
    if (isAuthPages(nextUrl)) {
      const response = NextResponse.next();
      response.cookies.delete('_session_id');
      return response;
    }
    searchParams.set('next', nextUrl.pathname);
    return NextResponse.redirect(new URL(`/login?${searchParams}`, req.url));
  }

  const jsonData = await response.json();
  const isUserSigned = !!jsonData.user;

  if (isAuthPages(nextUrl)) {
    if (!isUserSigned) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/dashboard?${searchParams}`, req.url)
    );
  }

  if (!isUserSigned) {
    searchParams.set('next', nextUrl.pathname);
    return NextResponse.redirect(new URL(`/login?${searchParams}`, req.url));
  }

  if (isUserSigned) {
    if (isDoctorPages(nextUrl) && jsonData.user.role !== 'Doctor') {
      return NextResponse.redirect(
        new URL(`/dashboard?${searchParams}`, req.url)
      );
    }

    const requestHeaders = new Headers(req.headers);
    const userHeaders = {
      'x-user-name': jsonData.user.username,
      'x-user-role': jsonData.user.role,
      'x-user-fullname': jsonData.user.fullname,
    };
    Object.entries(userHeaders).forEach(([key, value]) =>
      requestHeaders.set(key, value)
    );

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password'],
};
