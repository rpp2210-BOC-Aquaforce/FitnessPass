import { NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next';

import courses from './data.json';

export default async function GET(request) {
  return NextResponse.json(courses);
}