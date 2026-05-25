package com.aistudio.yemenallstore.bkwrt

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Color definitions
val SpaceDark = Color(0xFF0F172A)
val CardBackground = Color(0xFF1E293B)
val YemenGold = Color(0xFFE2E8F0)
val RedAccent = Color(0xFFEF4444)
val White = Color(0xFFFFFFFF)
val TextGray = Color(0xFF94A3B8)
val AccentGold = Color(0xFFD97706)

// Model representing a store product/service
data class Product(
    val id: String,
    val nameAr: String,
    val nameEn: String,
    val category: String,
    val price: String,
    val unit: String,
    val icon: ImageVector,
    val descAr: String,
    val descEn: String
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = YemenGold,
                    background = SpaceDark,
                    surface = CardBackground,
                    onBackground = White,
                    onSurface = White
                )
            ) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = SpaceDark
                ) {
                    MainStoreScreen()
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainStoreScreen() {
    var isArabic by remember { mutableStateOf(true) }
    var selectedCategory by remember { mutableStateOf("All") }
    var searchQuery by remember { mutableStateOf("") }
    val cart = remember { mutableStateListOf<Product>() }
    var showCartDialog by remember { mutableStateOf(false) }

    // Sample data for Yemen All Store categories (telecommunications, garments, cosmetics, gadgets, electronics, real estate, and public logistics)
    val categories = listOf("All", "Telecom", "Garments", "Cosmetics", "Gadgets", "Electronics", "Real Estate", "Logistics")

    val products = listOf(
        Product(
            "t1", "باقة إنترنت يمن موبايل 4G", "Yemen Mobile 4G Package", "Telecom",
            "4500", "YR", Icons.Default.Phone,
            "باقة إنترنت فائقة السرعة 10 جيجابايت صالحة لمدة شهر كامل.", "High-speed 10GB internet package valid for one month."
        ),
        Product(
            "t2", "رصيد شحن سبأفون فوري", "SabaFon Fast Recharge", "Telecom",
            "1000", "YR", Icons.Default.Call,
            "شحن رصيد فوري وسريع لشبكة سبأفون الهاتفية.", "Instant and fast mobile credit recharge for SabaFon network."
        ),
        Product(
            "g1", "جنبية صيفاني يمنية فاخرة", "Luxury Yemeni Jambiya", "Garments",
            "75000", "YR", Icons.Default.Star,
            "جنبية يمنية تراثية أصلية مصنوعة بحرفية ومهارة عالية.", "Authentic heritage Yemeni Jambiya crafted with high skill."
        ),
        Product(
            "g2", "شال كشميري يمني أصيل", "Authentic Kashmiri Shawl", "Garments",
            "12000", "YR", Icons.Default.AccountBox,
            "شال يمني بنقوش تقليدية وفريدة من الصوف الناعم.", "Yemeni shawl with unique traditional patterns made of soft wool."
        ),
        Product(
            "c1", "بخور عدني ملكي فاخر", "Luxury Adeni Bakhoor", "Cosmetics",
            "8500", "YR", Icons.Default.Favorite,
            "بخور عدني أصلي ذو رائحة زكية تدوم طويلاً في المكان.", "Original Adeni Bakhoor with a sweet long-lasting fragrance."
        ),
        Product(
            "c2", "كحل إثمد عربي أصلي", "Original Arab Ithmid Kohl", "Cosmetics",
            "3500", "YR", Icons.Default.Face,
            "كحل إثمد طبيعي نقي وخالٍ من الرصاص للعناية بالعين.", "Pure natural lead-free Ithmid Kohl for dynamic eye care."
        ),
        Product(
            "gd1", "هاتف ذكي حديث 4G/5G", "Modern 4G/5G Smartphone", "Gadgets",
            "180000", "YR", Icons.Default.PlayArrow,
            "أحدث الهواتف الذكية الداعمة لشبكات الجيل الرابع والخامس في اليمن.", "Latest smartphone supporting 4G/5G networks in Yemen."
        ),
        Product(
            "e1", "شاحن متنقل بمخرج سريع وشاشة ذكية", "Fast Power Bank with Digital Display", "Electronics",
            "15000", "YR", Icons.Default.Settings,
            "باور بانك بسعة ضخمة لشحن هاتفك في أي مكان أثناء انقطاع الكهرباء.", "Huge capacity power bank to charge your phone anywhere, power cut proof."
        ),
        Product(
            "re1", "شقة سكنية فاخرة - حدة، صنعاء", "Luxury Apartment - Haddah, Sana'a", "Real Estate",
            "45000000", "YR", Icons.Default.Home,
            "شقة راقية في أرقى أحياء العاصمة صنعاء مع كافة الخدمات والموقف الخاص.", "High-end apartment in Sana'a's finest neighborhood with all services."
        ),
        Product(
            "l1", "شحن وتوصيل طرود سريع بين المحافظات", "Fast Parcel Delivery Between Provinces", "Logistics",
            "3000", "YR", Icons.Default.Share,
            "خدمة توصيل آمنة وسريعة للطرود والمستندات بأسعار مناسبة.", "Safe, fast, affordable parcel & document delivery services inside Yemen."
        )
    )

    val filteredProducts = products.filter {
        (selectedCategory == "All" || it.category == selectedCategory) &&
        (searchQuery.isEmpty() ||
         it.nameAr.contains(searchQuery, ignoreCase = true) ||
         it.nameEn.contains(searchQuery, ignoreCase = true) ||
         it.descAr.contains(searchQuery, ignoreCase = true) ||
         it.descEn.contains(searchQuery, ignoreCase = true))
    }

    Scaffold(
        topBar = {
            Column {
                SmallTopAppBar(
                    title = {
                        Text(
                            text = if (isArabic) "متجر اليمن الشامل" else "Yemen All Store",
                            fontWeight = FontWeight.Bold,
                            color = White
                        )
                    },
                    actions = {
                        IconButton(onClick = { isArabic = !isArabic }) {
                            Icon(
                                imageVector = Icons.Default.Refresh,
                                contentDescription = "Switch Language / تغيير اللغة",
                                tint = YemenGold
                            )
                        }
                        IconButton(onClick = { showCartDialog = true }) {
                            BadgedBox(
                                badge = {
                                    if (cart.isNotEmpty()) {
                                        Badge {
                                            Text(cart.size.toString())
                                        }
                                    }
                                }
                            ) {
                                Icon(
                                    imageVector = Icons.Default.ShoppingCart,
                                    contentDescription = "Cart / السلة",
                                    tint = YemenGold
                                )
                            }
                        }
                    },
                    colors = TopAppBarDefaults.smallTopAppBarColors(
                        containerColor = SpaceDark
                    )
                )

                // Search Bar
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    shape = RoundedCornerShape(12.dp),
                    placeholder = {
                        Text(
                            text = if (isArabic) "ابحث عن منتج، عقار، باقة أو خدمة..." else "Search products, telecoms, real estate...",
                            color = TextGray
                        )
                    },
                    leadingIcon = {
                        Icon(imageVector = Icons.Default.Search, contentDescription = "Search icon", tint = TextGray)
                    },
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        focusedBorderColor = YemenGold,
                        unfocusedBorderColor = TextGray
                    ),
                    singleLine = true
                )

                // Categories Row
                LazyRow(
                    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    items(categories) { category ->
                        val isSelected = selectedCategory == category
                        val categoryNames = mapOf(
                            "All" to Pair("الكل", "All"),
                            "Telecom" to Pair("الاتصالات", "Telecom"),
                            "Garments" to Pair("الملابس والملبوسات", "Garments"),
                            "Cosmetics" to Pair("مستحضرات وجمال", "Cosmetics"),
                            "Gadgets" to Pair("أجهزة ذكية", "Gadgets"),
                            "Electronics" to Pair("إلكترونيات", "Electronics"),
                            "Real Estate" to Pair("العقارات", "Real Estate"),
                            "Logistics" to Pair("الخدمات اللوجستية", "Logistics")
                        )
                        val nameStr = if (isArabic) categoryNames[category]?.first ?: category else categoryNames[category]?.second ?: category

                        Card(
                            colors = CardDefaults.cardColors(
                                containerColor = if (isSelected) AccentGold else CardBackground
                            ),
                            shape = RoundedCornerShape(20.dp),
                            modifier = Modifier.clickable { selectedCategory = category }
                        ) {
                            Text(
                                text = nameStr,
                                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                                color = White,
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 13.sp
                            )
                        }
                    }
                }
            }
        },
        containerColor = SpaceDark
    ) { innerPadding ->
        LazyColumn(
            contentPadding = PaddingValues(
                start = 16.dp,
                end = 16.dp,
                top = innerPadding.calculateTopPadding(),
                bottom = innerPadding.calculateBottomPadding() + 16.dp
            ),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier.fillMaxSize()
        ) {
            // Header Hero Card
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(140.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .background(
                            Brush.linearGradient(
                                colors = listOf(AccentGold, RedAccent)
                            )
                        )
                        .padding(16.dp)
                ) {
                    Column(modifier = Modifier.align(Alignment.CenterStart)) {
                        Text(
                            text = if (isArabic) "بوابة اليمن التجارية الشاملة" else "Yemen All-In-One Trade Portal",
                            color = White,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = if (isArabic)
                                "تسوق المنتجات، اشحن هاتفك، تصفح العقارات، ونظّم الخدمات اللوجستية في مكان واحد!"
                            else
                                "Buy goods, top-up telecom, view real estate, and handle delivery logistics!",
                            color = YemenGold,
                            fontSize = 12.sp,
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                }
            }

            // Products list
            if (filteredProducts.isEmpty()) {
                item {
                    Text(
                        text = if (isArabic) "لا توجد نتائج مفرزة تطابق بحثك حالياً." else "No filtered results matches your criteria.",
                        color = TextGray,
                        textAlign = TextAlign.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp)
                    )
                }
            } else {
                items(filteredProducts) { prod ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = CardBackground),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .padding(16.dp)
                                .fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(60.dp)
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(SpaceDark)
                                    .padding(8.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = prod.icon,
                                    contentDescription = prod.nameEn,
                                    tint = YemenGold,
                                    modifier = Modifier.size(36.dp)
                                )
                            }

                            Spacer(modifier = Modifier.width(16.dp))

                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = if (isArabic) prod.nameAr else prod.nameEn,
                                    color = White,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = if (isArabic) prod.descAr else prod.descEn,
                                    color = TextGray,
                                    fontSize = 12.sp,
                                    maxLines = 2,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Spacer(modifier = Modifier.height(6.dp))
                                Row(
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "${prod.price} ${if (isArabic) "ريال" else prod.unit}",
                                        color = AccentGold,
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 15.sp
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = prod.category,
                                        color = TextGray,
                                        fontSize = 11.sp,
                                        modifier = Modifier
                                            .background(SpaceDark, RoundedCornerShape(4.dp))
                                            .padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.width(8.dp))

                            Button(
                                onClick = { cart.add(prod) },
                                colors = ButtonDefaults.buttonColors(containerColor = AccentGold),
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Add,
                                    contentDescription = "Add to cart / إضافة للسلة",
                                    tint = White
                                )
                            }
                        }
                    }
                }
            }
        }
    }

    // Cart Dialog
    if (showCartDialog) {
        AlertDialog(
            onDismissRequest = { showCartDialog = false },
            title = {
                Text(
                    text = if (isArabic) "سلتك الاستثمارية" else "Your Smart Cart",
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                if (cart.isEmpty()) {
                    Text(text = if (isArabic) "السلة فارغة حالياً. ابدأ بإضافة المنتجات والخدمات!" else "The cart is empty. Start adding items!")
                } else {
                    LazyColumn(
                        modifier = Modifier.fillMaxWidth(),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(cart) { item ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 4.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = if (isArabic) item.nameAr else item.nameEn,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis,
                                    modifier = Modifier.weight(1f)
                                )
                                Text(
                                    text = "${item.price} ${if (isArabic) "ريال" else item.unit}",
                                    color = AccentGold,
                                    fontWeight = FontWeight.Bold
                                )
                                IconButton(onClick = { cart.remove(item) }) {
                                    Icon(
                                        imageVector = Icons.Default.Delete,
                                        contentDescription = "Remove",
                                        tint = RedAccent
                                    )
                                }
                            }
                        }
                        item {
                            Divider(modifier = Modifier.padding(vertical = 8.dp))
                            val totalPrice = cart.sumOf { it.price.toLong() }
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = if (isArabic) "إجمالي المبلغ:" else "Total Balance:",
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "$totalPrice ${if (isArabic) "ريال يمني" else "YR"}",
                                    color = AccentGold,
                                    fontWeight = FontWeight.ExtraBold
                                )
                            }
                        }
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (cart.isNotEmpty()) {
                            cart.clear()
                            showCartDialog = false
                        } else {
                            showCartDialog = false
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = AccentGold)
                ) {
                    Text(text = if (cart.isEmpty()) (if (isArabic) "إغلاق" else "Close") else (if (isArabic) "تأكيد وإرسال عبر خدمة الواتساب" else "Confirm & Order via WhatsApp"))
                }
            }
        )
    }
}
