const districtData = [
  {
    district: "Puri",
    soil: ["Alluvial", "Coastal Sandy"],
    irrigation: ["Canal", "Tube Wells", "Tanks"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Chlorpyrifos", "Imidacloprid"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Carbofuran", "Monocrotophos"],
        irrigation: ["Canal"],
      },
      vegetables: {
        fertilizers: ["Compost", "NPK 12-32-16"],
        pesticides: ["Neem Oil", "Imidacloprid"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Khordha",
    soil: ["Red & Lateritic", "Alluvial"],
    irrigation: ["Tanks", "Tube Wells", "Sprinkler"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Emamectin", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "FYM"],
        pesticides: ["Emamectin", "Neem Oil"],
        irrigation: ["Tanks"],
      },
      maize: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Imidacloprid"],
        irrigation: ["Sprinkler"],
      },
    },
  },
  {
    district: "Cuttack",
    soil: ["Alluvial"],
    irrigation: ["Canal", "Tube Wells"],
    fertilizers: ["Urea", "NPK 10-26-26"],
    pesticides: ["Imidacloprid", "Buprofezin"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorpyrifos", "Monocrotophos"],
        irrigation: ["Canal"],
      },
      pulses: {
        fertilizers: ["SSP", "Compost"],
        pesticides: ["Neem Oil", "Trichoderma"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Kendrapara",
    soil: ["Alluvial", "Saline patches"],
    irrigation: ["Canal", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "SSP"],
    pesticides: ["Imidacloprid", "Acephate"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Acephate", "Chlorpyrifos"],
        irrigation: ["Canal"],
      },
      vegetables: {
        fertilizers: ["Compost", "FYM"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Jagatsinghpur",
    soil: ["Alluvial", "Coastal Sandy"],
    irrigation: ["Canal", "Tanks"],
    fertilizers: ["Urea", "NPK 12-32-16"],
    pesticides: ["Chlorantraniliprole", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorantraniliprole"],
        irrigation: ["Canal"],
      },
      pulses: {
        fertilizers: ["SSP"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tanks"],
      },
    },
  },
  {
    district: "Balasore",
    soil: ["Alluvial", "Coastal Sandy"],
    irrigation: ["Canal", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Imidacloprid", "Chlorpyrifos"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Imidacloprid"],
        irrigation: ["Canal"],
      },
      vegetables: {
        fertilizers: ["NPK 12-32-16", "FYM"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Bhadrak",
    soil: ["Alluvial"],
    irrigation: ["Canal", "Tanks"],
    fertilizers: ["Urea", "NPK 20-20-0"],
    pesticides: ["Cartap", "Malathion"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Cartap"],
        irrigation: ["Canal"],
      },
      pulses: {
        fertilizers: ["Compost", "SSP"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tanks"],
      },
    },
  },
  {
    district: "Jajpur",
    soil: ["Alluvial"],
    irrigation: ["Canal", "Tube Wells"],
    fertilizers: ["Urea", "NPK 12-32-16"],
    pesticides: ["Buprofezin", "Imidacloprid"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Buprofezin"],
        irrigation: ["Canal"],
      },
      maize: {
        fertilizers: ["Urea", "Compost"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Mayurbhanj",
    soil: ["Red Loam", "Lateritic"],
    irrigation: ["Tube Wells", "Tanks"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Emamectin", "Neem Oil"],
    crops: {
      maize: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Emamectin"],
        irrigation: ["Tube Wells"],
      },
      pulses: {
        fertilizers: ["SSP", "FYM"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tanks"],
      },
    },
  },
  {
    district: "Keonjhar",
    soil: ["Red & Lateritic"],
    irrigation: ["Lift Irrigation", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "Compost"],
    pesticides: ["Chlorpyrifos", "NSKE"],
    crops: {
      maize: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorpyrifos"],
        irrigation: ["Lift Irrigation"],
      },
      vegetables: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["NSKE", "Neem Oil"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Sundargarh",
    soil: ["Red & Lateritic"],
    irrigation: ["Tanks", "Sprinkler"],
    fertilizers: ["Urea", "SSP", "FYM"],
    pesticides: ["Cartap", "Abamectin"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "SSP"],
        pesticides: ["Cartap"],
        irrigation: ["Tanks"],
      },
      maize: {
        fertilizers: ["Urea", "FYM"],
        pesticides: ["Abamectin"],
        irrigation: ["Sprinkler"],
      },
    },
  },
  {
    district: "Sambalpur",
    soil: ["Alluvial", "Red Loam"],
    irrigation: ["Canal", "Lift"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Chlorantraniliprole", "Chlorpyrifos"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorantraniliprole"],
        irrigation: ["Canal"],
      },
      pulses: {
        fertilizers: ["MOP", "FYM"],
        pesticides: ["Chlorpyrifos"],
        irrigation: ["Lift"],
      },
    },
  },
  {
    district: "Jharsuguda",
    soil: ["Alluvial", "Lateritic"],
    irrigation: ["Tube Wells", "Tanks"],
    fertilizers: ["Urea", "SSP", "FYM"],
    pesticides: ["Emamectin", "Imidacloprid"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "SSP"],
        pesticides: ["Emamectin"],
        irrigation: ["Tube Wells"],
      },
      vegetables: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Imidacloprid"],
        irrigation: ["Tanks"],
      },
    },
  },
  {
    district: "Bargarh",
    soil: ["Alluvial"],
    irrigation: ["Canal (Hirakud)", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Buprofezin", "Chlorantraniliprole"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Buprofezin"],
        irrigation: ["Canal (Hirakud)"],
      },
      pulses: {
        fertilizers: ["MOP", "Compost"],
        pesticides: ["Chlorantraniliprole"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Balangir",
    soil: ["Red Loam", "Sandy Loam"],
    irrigation: ["Tanks", "Sprinkler"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Chlorpyrifos", "Neem Cake"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorpyrifos"],
        irrigation: ["Tanks"],
      },
      maize: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Neem Cake"],
        irrigation: ["Sprinkler"],
      },
    },
  },
  {
    district: "Subarnapur",
    soil: ["Alluvial", "Red Loam"],
    irrigation: ["Canal", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Imidacloprid", "Emamectin"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Imidacloprid"],
        irrigation: ["Canal"],
      },
      pulses: {
        fertilizers: ["MOP", "FYM"],
        pesticides: ["Emamectin"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Deogarh",
    soil: ["Red & Lateritic"],
    irrigation: ["Tanks", "Sprinkler"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Chlorantraniliprole", "Imidacloprid"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorantraniliprole"],
        irrigation: ["Tanks"],
      },
      maize: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Imidacloprid"],
        irrigation: ["Sprinkler"],
      },
    },
  },
  {
    district: "Angul",
    soil: ["Red Loam", "Lateritic"],
    irrigation: ["Tanks", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Imidacloprid", "NSKE"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Imidacloprid"],
        irrigation: ["Tanks"],
      },
      vegetables: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["NSKE"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Dhenkanal",
    soil: ["Red & Lateritic", "Alluvial"],
    irrigation: ["Tube Wells", "Lift"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Chlorantraniliprole", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorantraniliprole"],
        irrigation: ["Tube Wells"],
      },
      pulses: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Neem Oil"],
        irrigation: ["Lift"],
      },
    },
  },
  {
    district: "Kalahandi",
    soil: ["Red Loam", "Black Soil"],
    irrigation: ["Canal", "Lift", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Imidacloprid", "Emamectin"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Imidacloprid"],
        irrigation: ["Canal"],
      },
      maize: {
        fertilizers: ["MOP", "Compost"],
        pesticides: ["Emamectin"],
        irrigation: ["Lift"],
      },
    },
  },
  {
    district: "Nuapada",
    soil: ["Red Loam", "Sandy Loam"],
    irrigation: ["Tanks", "Lift"],
    fertilizers: ["Urea", "DAP", "Compost"],
    pesticides: ["Neem Oil", "Traps"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tanks"],
      },
      pulses: {
        fertilizers: ["Compost", "FYM"],
        pesticides: ["Traps"],
        irrigation: ["Lift"],
      },
    },
  },
  {
    district: "Nabarangpur",
    soil: ["Black Soil", "Red Sandy Loam"],
    irrigation: ["Canal", "Tube Wells"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Emamectin", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Emamectin"],
        irrigation: ["Canal"],
      },
      maize: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tube Wells"],
      },
    },
  },
  {
    district: "Koraput",
    soil: ["Red Sandy Loam", "Lateritic"],
    irrigation: ["Tanks", "Minor Reservoirs"],
    fertilizers: ["Urea", "DAP", "Green Manure"],
    pesticides: ["NSKE", "Trichoderma"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["NSKE"],
        irrigation: ["Tanks"],
      },
      pulses: {
        fertilizers: ["Green Manure", "FYM"],
        pesticides: ["Trichoderma"],
        irrigation: ["Minor Reservoirs"],
      },
    },
  },
  {
    district: "Malkangiri",
    soil: ["Red Sandy Loam"],
    irrigation: ["Tanks", "Lift"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Neem Oil", "Emamectin"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tanks"],
      },
      maize: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Emamectin"],
        irrigation: ["Lift"],
      },
    },
  },
  {
    district: "Rayagada",
    soil: ["Red Sandy Loam", "Lateritic"],
    irrigation: ["Tanks", "Drip (horti)"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Emamectin", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Emamectin"],
        irrigation: ["Tanks"],
      },
      pulses: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Neem Oil"],
        irrigation: ["Drip (horti)"],
      },
    },
  },
  {
    district: "Gajapati",
    soil: ["Red Sandy", "Lateritic"],
    irrigation: ["Tanks", "Reservoirs"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Neem Oil", "Sticky Traps"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Neem Oil"],
        irrigation: ["Tanks"],
      },
      pulses: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Sticky Traps"],
        irrigation: ["Reservoirs"],
      },
    },
  },
  {
    district: "Ganjam",
    soil: ["Red Loam", "Black Soil"],
    irrigation: ["Tanks", "Drip"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Spinosad", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Spinosad"],
        irrigation: ["Tanks"],
      },
      cotton: {
        fertilizers: ["MOP", "DAP"],
        pesticides: ["Neem Oil"],
        irrigation: ["Drip"],
      },
    },
  },
  {
    district: "Kandhamal",
    soil: ["Red Sandy Loam"],
    irrigation: ["Tanks", "Sprinkler"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Emamectin", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Emamectin"],
        irrigation: ["Tanks"],
      },
      vegetables: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Neem Oil"],
        irrigation: ["Sprinkler"],
      },
    },
  },
  {
    district: "Boudh",
    soil: ["Red Loam", "Sandy Loam"],
    irrigation: ["Tanks", "Sprinkler"],
    fertilizers: ["Urea", "DAP", "FYM"],
    pesticides: ["Lambda-cyhalothrin", "Neem Oil"],
    crops: {
      paddy: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Lambda-cyhalothrin"],
        irrigation: ["Tanks"],
      },
      pulses: {
        fertilizers: ["FYM", "Compost"],
        pesticides: ["Neem Oil"],
        irrigation: ["Sprinkler"],
      },
    },
  },
  {
    district: "Sambalpur",
    soil: ["Alluvial", "Red Loam"],
    irrigation: ["Canal", "Lift"],
    fertilizers: ["Urea", "DAP", "MOP"],
    pesticides: ["Chlorantraniliprole", "Chlorpyrifos"],
    crops: {
      wheat: {
        fertilizers: ["Urea", "DAP"],
        pesticides: ["Chlorantraniliprole"],
        irrigation: ["Canal"],
      },
      maize: {
        fertilizers: ["MOP", "FYM"],
        pesticides: ["Chlorpyrifos"],
        irrigation: ["Lift"],
      },
    },
  },
];

export default districtData;
