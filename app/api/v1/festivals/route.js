import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Extraction des paramètres de pagination et de filtrage
    const offset = parseInt(searchParams.get("offset")) || 0;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const category = parseInt(searchParams.get("category")) || null;
    const searchQuery = searchParams.get("search") || null;

    // Construction de la clause where pour les filtres
    const whereClause = {
      AND: [
        category ? { category_id: category } : {}, // Filtrer par catégorie si spécifiée
        searchQuery
          ? {
              OR: [
                {
                  category: {
                    name: { contains: searchQuery, mode: "insensitive" },
                  },
                }, // Filtrer par nom de catégorie contenant searchQuery
                { city: { contains: searchQuery, mode: "insensitive" } }, // Filtrer par ville contenant searchQuery
                { name: { contains: searchQuery, mode: "insensitive" } }, // Filtrer par nom de festival contenant searchQuery
              ],
            }
          : {}, // Si aucune recherche, ne pas appliquer de filtres supplémentaires
      ],
    };

    // Récupération du nombre total de festivals
    const totalFestivals = await prisma.festival.count({
      where: whereClause,
    });

    // Récupération des festivals avec pagination et informations sur la catégorie
    const festivals = await prisma.festival.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      include: {
        category: true, // Supposant qu'il y a une relation 'category' dans le modèle festival
      },
    });

    // Déconnexion de Prisma après utilisation
    await prisma.$disconnect();

    // Retour de la réponse avec les données, le nombre total, et les paramètres de pagination
    return NextResponse.json({
      status: "success",
      nb_results: totalFestivals,
      offset,
      limit,
      data: festivals,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
