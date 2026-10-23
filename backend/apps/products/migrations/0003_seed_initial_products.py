from django.db import migrations

def seed_products(apps, schema_editor):
    Product = apps.get_model('products', 'Product')
    if Product.objects.count() == 0:
        products = [
            {
                "id": 1,
                "name": "Filler Granules",
                "slug": "filler-granules",
                "short_description": "High-grade mineral-filled polymer granules designed to optimize compounding economics, enhance structural stiffness, and provide superior surface smoothness.",
                "description": "Jay Veer Enterprise's Filler Granules are formulated with micronized calcium carbonate and high-grade carrier polymers. Designed for plastic processors seeking cost optimization without compromising mechanical integrity, our filler granules ensure exceptional dispersion, higher heat deflection resistance, and seamless processability across extrusion and molding lines.",
                "applications": "Woven Sacks & Raffia Tapes, Blow Moulding Containers, Injection Moulding Household Items, Extrusion Sheets & Films, Carry Bags & Packaging Liners",
                "image": "products/filler-granules.png",
                "is_active": True,
            },
            {
                "id": 2,
                "name": "LD Granules",
                "slug": "ld-granules",
                "short_description": "Premium Low-Density Polyethylene (LDPE) granules offering superior flexibility, optical clarity, puncture resistance, and seamless melt processing.",
                "description": "Our LD Granules are selected for their excellent processability, elasticity, and clean melt profile. Widely deployed across plastic film extrusion, flexible packaging, squeeze containers, and general plastic goods, these granules deliver balanced melt flow and high burst resistance.",
                "applications": "Packaging Films & Shrink Wraps, Agricultural Sheets & Greenhouse Films, Plastic Carry Bags & Liners, Squeeze Bottles & Closures, Extrusion Coatings & Lamination",
                "image": "products/ld-granules.jpg",
                "is_active": True,
            },
            {
                "id": 3,
                "name": "Reprocessed Granules",
                "slug": "reprocessed-granules",
                "short_description": "Cost-effective, screened recycled polymer granules delivering reliable performance for industrial molding, non-critical packaging, and infrastructure goods.",
                "description": "Engineered through precision sorting, washing, and multi-mesh melt filtration extruders. Our reprocessed plastic granules provide consistent physical properties while reducing raw material carbon footprint and procurement costs.",
                "applications": "Industrial Pipes & Conduits, Heavy-Duty Transport Crates, Garbage Liners & Tarpaulins, Plastic Pallets, Household Utilities & Planters",
                "image": "products/reprocessed-granules.webp",
                "is_active": True,
            },
            {
                "id": 4,
                "name": "Color Masterbatch",
                "slug": "color-masterbatch",
                "short_description": "Concentrated pigment masterbatches delivering vibrant, uniform dispersion, high thermal stability, and light-fast color solutions for plastics.",
                "description": "Formulated with ultra-fine pigment concentrations and high melt index carrier resins. Ensures seamless blending during extrusion and injection moulding without streaking or pigment agglomeration.",
                "applications": "Blown Film Coloring, Injection Moulded Caps & Closures, Rotomoulded Tanks, Extruded Profiles, Consumer Durables & Toys",
                "image": "products/color-masterbatch.jpg",
                "is_active": True,
            },
            {
                "id": 5,
                "name": "Custom Plastic Colors",
                "slug": "custom-plastic-colors",
                "short_description": "Tailor-made color compounds engineered to exact Pantone, RAL, or physical sample requirements with tight shade tolerance.",
                "description": "Our compounding laboratory matches target shade panels and delivers bespoke pre-colored compounds. Eliminates in-house pigment dosing errors and guarantees lot-to-lot color repeatability.",
                "applications": "Automotive Interior Trim, Electronics Housings, Custom Cosmetic Bottles, Branded Packaging, Specialized Houseware Products",
                "image": "products/custom-plastic-colors.webp",
                "is_active": True,
            },
        ]
        for p in products:
            Product.objects.create(**p)

def unseed_products(apps, schema_editor):
    pass

class Migration(migrations.Migration):
    dependencies = [
        ('products', '0002_alter_product_applications_alter_product_description_and_more'),
    ]
    operations = [
        migrations.RunPython(seed_products, unseed_products),
    ]
