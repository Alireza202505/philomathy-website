import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();

    const coupon = await base44.asServiceRole.entities.Coupon.create({
      code: (body.code || "").toUpperCase().trim(),
      description: body.description || "",
      discountType: body.discountType,
      value: Number(body.value) || 0,
      expirationDate: body.expirationDate || null,
      maxUses: body.maxUses ? Number(body.maxUses) : null,
      minPurchase: body.minPurchase ? Number(body.minPurchase) : 0,
      applicableCategories: Array.isArray(body.applicableCategories) ? body.applicableCategories : [],
      isActive: true,
      uses: 0,
    });

    return Response.json({ coupon });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});