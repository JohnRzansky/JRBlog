<?php

//define environment types
const ENV_LOCAL = 'local';
const ENV_DEV = 'development';
const ENV_TEST = 'test';
const ENV_PROD = 'production';

//Automatically detect environment
$hostname = gethostname();

$environment = match ($hostname) {
    'jrblog.com-prod' => ENV_PROD,
    'jrblog.com-development' => ENV_DEV,
    'jrblog.com-test' => ENV_TEST,
    default => ENV_LOCAL,
};

switch ($environment) {
    case ENV_LOCAL:
        $dbhost = "localhost";
        $dbname = "jrblog";
        $dbuser = "root";
        $dbpassword = "";
        break;
	case ENV_DEV:
        $dbhost = "dev-db";
        $dbname = "";
        $dbuser = "";
        $dbpassword = "";
        break;
	case ENV_TEST:
        $dbhost = "test-db";
        $dbname = "";
        $dbuser = "";
        $dbpassword = "";
        break;
	case ENV_PROD:
        $dbhost = "prod-db";
        $dbname = "";
        $dbuser = "";
        $dbpassword = "";
        break;
    default:
        /** @noinspection PhpUnhandledExceptionInspection */
        throw new Exception('Unknown environment: ' . $environment);
}

try {
    $dsn = "mysql:host=$dbhost;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $dbuser, $dbpassword, $options);
} catch (PDOException $e) {
    /** @noinspection PhpUnhandledExceptionInspection */
    throw new Exception('Database connection failed: ' . $e->getMessage());
}


