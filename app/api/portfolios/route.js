import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(req) {
  try {
    const { search, field = 'pid' } = Object.fromEntries(new URL(req.url).searchParams);

    if (!search) {
      return NextResponse.json({ error: "Searched keyword is required" }, { status: 400 });
    }
    if (!field) {
      return NextResponse.json({ error: "Field is required" }, { status: 400 });
    }

    const { data: exactMatch, emError } = await supabase
      .from("portfolios")
      .select("*")
      .eq(field, search);

      if(emError) {
        return NextResponse.json({ emError }, { status: 404 })
      }

    const { data: otherMatches, omError } = await supabase
      .from("portfolios")
      .select("*")
      .ilike(field, `%${search}%`);

      if(omError) {
        return NextResponse.json({ omError }, { status: 404 })
      }
  

    let allMatches = [];

    if (exactMatch && exactMatch.length > 0) {
      allMatches = [
        exactMatch[0],
        ...otherMatches.filter((item) => item.id !== exactMatch[0].id),
      ];
    } else {
      allMatches = otherMatches;
    }

    return NextResponse.json(allMatches);
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
}

export async function POST(req) {
  try {
    const { pid, uid, likeCount, tags, replies, image, name } = await req.json();
    const { data, error } = await supabase
      .from('portfolios')
      .insert([{ pid, uid, likeCount, tags, replies, image, name }])
      .select();

    if(error) {
      return NextResponse.json({ error }, { status: 406 })
    }

    return NextResponse.json(data ? data[0] : { message: 'Portfolio created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 406 });
  }
}

export async function PUT(req, params) {
  try {
    const { pid } = params;

    if (!pid) {
      return NextResponse.json({ error: "Portfolio ID is required" }, { status: 400 });
    }

    const { uid, likeCount, tags, replies, image, name } = await req.json();
    const { data, error } = await supabase
      .from('portfolios')
      .update([{ uid, likeCount, tags, replies, image, name }])
      .eq('pid', pid)
      .select();

      if(error) {
        return NextResponse.json({ error }, { status: 404 })
      }
  

    return NextResponse.json(data ? data[0] : { message: 'Portfolio updated successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
}

export async function DELETE(req, params) {
  try {
    const { pid } = params;

    if (!pid) {
      return NextResponse.json({ error: "Portfolio ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from('portfolios')
      .select()
      .eq('pid', pid)
      .delete();

      if(error) {
        return NextResponse.json({ error }, { status: 404 })
      }
  

    return NextResponse.json({ message: 'Portfolio deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
}